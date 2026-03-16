import { createHash, randomBytes, randomUUID, scryptSync, timingSafeEqual } from 'node:crypto';
import type { APIContext, AstroCookies } from 'astro';
import { z } from 'zod';
import type { Currency } from '@/lib/currency';
import type { Locale } from '@/lib/i18n';
import { ensureSupportTables, getPool } from '@/server/db';
import { getMockStore } from '@/server/mock-store';

export type SessionUser = {
	id: string;
	email: string;
	fullName: string;
	companyName: string;
	phone: string;
	locale: Locale;
	currency: Currency;
	avatarDataUrl: string | null;
	createdAt: string;
};

const loginSchema = z.object({
	email: z.email(),
	password: z.string().min(8),
});

const registerSchema = z.object({
	email: z.email(),
	password: z.string().min(8),
	fullName: z.string().min(2),
	companyName: z.string().optional().default(''),
	phone: z.string().optional().default(''),
	locale: z.enum(['ro', 'en', 'de']).default('ro'),
	currency: z.enum(['RON', 'EUR', 'USD']).default('RON'),
});

const profileSchema = z.object({
	fullName: z.string().min(2),
	companyName: z.string().optional().default(''),
	phone: z.string().optional().default(''),
	locale: z.enum(['ro', 'en', 'de']),
	currency: z.enum(['RON', 'EUR', 'USD']),
});

const passwordSchema = z.object({
	currentPassword: z.string().min(8),
	newPassword: z.string().min(8),
});

const authRateLimit = new Map<string, { count: number; resetAt: number }>();

function getCookieName() {
	return import.meta.env.SESSION_COOKIE_NAME ?? 'svh_session';
}

function getSessionTtlMs() {
	const hours = Number(import.meta.env.SESSION_TTL_HOURS ?? '168');
	return hours * 60 * 60 * 1000;
}

export function hashPassword(password: string) {
	const salt = randomBytes(16).toString('hex');
	const derived = scryptSync(password, salt, 64).toString('hex');
	return `${salt}:${derived}`;
}

function verifyPassword(password: string, storedHash: string) {
	const [salt, key] = storedHash.split(':');
	if (!salt || !key) {
		return false;
	}
	const hashedBuffer = scryptSync(password, salt, 64);
	const keyBuffer = Buffer.from(key, 'hex');
	return timingSafeEqual(hashedBuffer, keyBuffer);
}

function hashToken(token: string) {
	return createHash('sha256').update(token).digest('hex');
}

function toAppLocale(language: string | null | undefined): Locale {
	if (language === 'en' || language === 'de' || language === 'ro') {
		return language;
	}
	return 'ro';
}

function toAppCurrency(currency: string | null | undefined): Currency {
	if (currency === 'EUR' || currency === 'USD' || currency === 'RON') {
		return currency;
	}
	return 'RON';
}

function splitFullName(fullName: string) {
	const parts = fullName.trim().split(/\s+/).filter(Boolean);
	if (parts.length === 0) {
		return { firstName: 'Client', lastName: 'VIP' };
	}
	if (parts.length === 1) {
		return { firstName: parts[0], lastName: 'Client' };
	}
	return {
		firstName: parts.slice(0, -1).join(' '),
		lastName: parts.at(-1) ?? 'Client',
	};
}

async function getDefaultOrganizationId() {
	const pool = getPool();
	if (!pool) {
		return '00000000-0000-0000-0000-000000000001';
	}
	const result = await pool.query(
		`select id
		 from organizations
		 where status = 'active'
		 order by created_at asc
		 limit 1`,
	);
	const id = result.rows[0]?.id;
	if (!id) {
		throw new Error('No active organization found.');
	}
	return id as string;
}

function assertOrigin(context: APIContext) {
	const origin = context.request.headers.get('origin');
	const url = new URL(context.request.url);
	if (origin && origin !== url.origin) {
		throw new Error('Invalid origin');
	}
}

export function enforceRateLimit(key: string, limit = 10, windowMs = 15 * 60 * 1000) {
	const now = Date.now();
	const entry = authRateLimit.get(key);
	if (!entry || entry.resetAt < now) {
		authRateLimit.set(key, { count: 1, resetAt: now + windowMs });
		return;
	}
	if (entry.count >= limit) {
		throw new Error('Too many requests. Please try again later.');
	}
	entry.count += 1;
}

export async function getSessionUser(cookies: AstroCookies): Promise<SessionUser | null> {
	const token = cookies.get(getCookieName())?.value;
	if (!token) {
		return null;
	}
	const tokenHash = hashToken(token);
	const pool = getPool();
	if (!pool) {
		const mock = getMockStore();
		const session = Array.from(mock.sessions.values()).find((item) => item.tokenHash === tokenHash && item.expiresAt > Date.now());
		if (!session) {
			return null;
		}
		const user = mock.users.get(session.userId);
		return user
			? {
					id: user.id,
					email: user.email,
					fullName: user.fullName,
					companyName: user.companyName,
					phone: user.phone,
					locale: user.locale as Locale,
					currency: user.currency as Currency,
					avatarDataUrl: user.avatarDataUrl,
					createdAt: user.createdAt,
			  }
			: null;
	}

	await ensureSupportTables();
	const result = await pool.query(
		`select
			c.id,
			c.email,
			c.first_name,
			c.last_name,
			c.company_name,
			c.phone_number,
			c.language,
			c.currency,
			c.created_at,
			(
				select ccf.field_value
				from customer_custom_fields ccf
				where ccf.customer_id = c.id
				  and ccf.field_name = 'avatar_data_url'
				order by ccf.updated_at desc nulls last, ccf.created_at desc nulls last
				limit 1
			) as avatar_data_url
		 from customer_sessions s
		 join customers c on c.id = s.customer_id
		 where s.token_hash = $1
		   and s.revoked_at is null
		   and s.expires_at > now()`,
		[tokenHash],
	);
	const user = result.rows[0];
	if (!user) {
		return null;
	}
	return {
		id: user.id,
		email: user.email,
		fullName: [user.first_name, user.last_name].filter(Boolean).join(' ').trim(),
		companyName: user.company_name ?? '',
		phone: user.phone_number ?? '',
		locale: toAppLocale(user.language),
		currency: toAppCurrency(user.currency),
		avatarDataUrl: user.avatar_data_url,
		createdAt: user.created_at.toISOString(),
	};
}

function setSessionCookie(context: APIContext, token: string) {
	context.cookies.set(getCookieName(), token, {
		httpOnly: true,
		path: '/',
		sameSite: 'lax',
		secure: new URL(context.request.url).protocol === 'https:',
		maxAge: Math.floor(getSessionTtlMs() / 1000),
	});
}

export function clearSessionCookie(context: APIContext) {
	context.cookies.delete(getCookieName(), { path: '/' });
}

async function createSession(context: APIContext, userId: string) {
	const token = randomBytes(32).toString('hex');
	const tokenHash = hashToken(token);
	const expiresAt = new Date(Date.now() + getSessionTtlMs());
	const pool = getPool();
	if (!pool) {
		const mock = getMockStore();
		mock.sessions.set(randomUUID(), {
			id: randomUUID(),
			userId,
			tokenHash,
			expiresAt: expiresAt.getTime(),
		});
		setSessionCookie(context, token);
		return;
	}
	await ensureSupportTables();
	await pool.query(
		`insert into customer_sessions (id, customer_id, token_hash, ip_address, user_agent, expires_at)
		 values ($1, $2, $3, $4, $5, $6)`,
		[
			randomUUID(),
			userId,
			tokenHash,
			context.clientAddress ?? null,
			context.request.headers.get('user-agent'),
			expiresAt,
		],
	);
	setSessionCookie(context, token);
}

export async function registerUser(context: APIContext, payload: unknown) {
	assertOrigin(context);
	const input = registerSchema.parse(payload);
	const pool = getPool();
	if (!pool) {
		const mock = getMockStore();
		const exists = Array.from(mock.users.values()).some((user) => user.email.toLowerCase() === input.email.toLowerCase());
		if (exists) {
			throw new Error('Email already exists.');
		}
		const id = randomUUID();
		mock.users.set(id, {
			id,
			email: input.email.toLowerCase(),
			passwordHash: hashPassword(input.password),
			fullName: input.fullName,
			companyName: input.companyName,
			phone: input.phone,
			locale: input.locale,
			currency: input.currency,
			avatarDataUrl: null,
			createdAt: new Date().toISOString(),
		});
		await createSession(context, id);
		return getSessionUser(context.cookies);
	}

	const organizationId = await getDefaultOrganizationId();
	const { firstName, lastName } = splitFullName(input.fullName);
	const id = randomUUID();
	await pool.query(
		`insert into customers (
			id, organization_id, first_name, last_name, company_name, email, phone_number, currency, language, password_hash, status, created_at, updated_at
		) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, 'active', now(), now())`,
		[id, organizationId, firstName, lastName, input.companyName || null, input.email.toLowerCase(), input.phone || null, input.currency, input.locale, hashPassword(input.password)],
	);
	await createSession(context, id);
	return getSessionUser(context.cookies);
}

export async function loginUser(context: APIContext, payload: unknown) {
	assertOrigin(context);
	const input = loginSchema.parse(payload);
	enforceRateLimit(`login:${input.email.toLowerCase()}`);
	const pool = getPool();
	if (!pool) {
		const mock = getMockStore();
		const user = Array.from(mock.users.values()).find((item) => item.email === input.email.toLowerCase());
		if (!user || !verifyPassword(input.password, user.passwordHash)) {
			throw new Error('Invalid email or password.');
		}
		await createSession(context, user.id);
		return getSessionUser(context.cookies);
	}

	const result = await pool.query(
		`select id, password_hash, status
		 from customers
		 where email = $1`,
		[input.email.toLowerCase()],
	);
	const user = result.rows[0];
	if (!user || user.status !== 'active' || !verifyPassword(input.password, user.password_hash)) {
		throw new Error('Invalid email or password.');
	}
	await pool.query(`update customers set last_login_at = now(), updated_at = now() where id = $1`, [user.id]);
	await createSession(context, user.id);
	return getSessionUser(context.cookies);
}

export async function logoutUser(context: APIContext) {
	const token = context.cookies.get(getCookieName())?.value;
	if (!token) {
		return;
	}
	const tokenHash = hashToken(token);
	const pool = getPool();
	if (!pool) {
		const mock = getMockStore();
		for (const [key, session] of mock.sessions.entries()) {
			if (session.tokenHash === tokenHash) {
				mock.sessions.delete(key);
			}
		}
		clearSessionCookie(context);
		return;
	}
	await ensureSupportTables();
	await pool.query(`update customer_sessions set revoked_at = now() where token_hash = $1`, [tokenHash]);
	clearSessionCookie(context);
}

export async function updateProfile(userId: string, payload: unknown) {
	const input = profileSchema.parse(payload);
	const pool = getPool();
	if (!pool) {
		const user = getMockStore().users.get(userId);
		if (!user) {
			throw new Error('User not found.');
		}
		Object.assign(user, input);
		return;
	}
	const { firstName, lastName } = splitFullName(input.fullName);
	await pool.query(
		`update customers
		 set first_name = $2, last_name = $3, company_name = $4, phone_number = $5, language = $6, currency = $7, updated_at = now()
		 where id = $1`,
		[userId, firstName, lastName, input.companyName || null, input.phone || null, input.locale, input.currency],
	);
}

export async function updatePassword(userId: string, payload: unknown) {
	const input = passwordSchema.parse(payload);
	const pool = getPool();
	if (!pool) {
		const user = getMockStore().users.get(userId);
		if (!user || !verifyPassword(input.currentPassword, user.passwordHash)) {
			throw new Error('Current password is invalid.');
		}
		user.passwordHash = hashPassword(input.newPassword);
		return;
	}
	const result = await pool.query(`select password_hash from customers where id = $1`, [userId]);
	const user = result.rows[0];
	if (!user || !verifyPassword(input.currentPassword, user.password_hash)) {
		throw new Error('Current password is invalid.');
	}
	await pool.query(`update customers set password_hash = $2, updated_at = now() where id = $1`, [userId, hashPassword(input.newPassword)]);
}

export async function updateAvatar(userId: string, dataUrl: string | null) {
	const pool = getPool();
	if (!pool) {
		const user = getMockStore().users.get(userId);
		if (!user) {
			throw new Error('User not found.');
		}
		user.avatarDataUrl = dataUrl;
		return;
	}
	await pool.query(`delete from customer_custom_fields where customer_id = $1 and field_name = 'avatar_data_url'`, [userId]);
	if (dataUrl) {
		await pool.query(
			`insert into customer_custom_fields (id, customer_id, field_name, field_value, created_at, updated_at)
			 values ($1, $2, 'avatar_data_url', $3, now(), now())`,
			[randomUUID(), userId, dataUrl],
		);
	}
}

export async function getServiceSummary(userId: string) {
	const pool = getPool();
	if (!pool) {
		return [
			{ name: 'Managed Shared Hosting', status: 'active', details: 'Launch plan / 1 website' },
			{ name: 'Server Administration', status: 'scheduled', details: 'Monthly maintenance window' },
		];
	}
	try {
		const result = await pool.query(
			`select
				coalesce(p.name, pg.name, hs.domain, 'Hosting service') as service_name,
				hs.status,
				trim(
					both ' / ' from concat_ws(' / ',
						nullif(hs.domain, ''),
						nullif(hs.billing_cycle, ''),
						case
							when hs.amount is not null and hs.currency is not null then concat(hs.amount::text, ' ', hs.currency)
							when hs.amount is not null then hs.amount::text
							else null
						end
					)
				) as details
			 from hosting_services hs
			 left join products p on p.id = hs.product_id
			 left join product_groups pg on pg.id = p.product_group_id
			 where hs.customer_id = $1
			 order by hs.created_at desc
			 limit 5`,
			[userId],
		);
		return result.rows.map((row: { service_name: string; status: string; details: string }) => ({
			name: row.service_name,
			status: row.status,
			details: row.details,
		}));
	} catch {
		return [];
	}
}
