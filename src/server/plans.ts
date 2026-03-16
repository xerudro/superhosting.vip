import { getPool } from './db';
import type { PricingPlan } from '@/lib/site';
import type { Locale } from '@/lib/i18n';

interface DbProduct {
	id: string;
	name: string;
	description: string;
	product_type: string;
	pricing: Record<string, number>;
	config_options: Record<string, unknown>;
	sort_order: number;
}

function buildFeatures(row: DbProduct): string[] {
	// Use description as comma-separated feature list
	return row.description
		.split(', ')
		.map((f) => f.trim())
		.filter(Boolean);
}

function ctaLabel(locale: Locale, type: 'shared' | 'vps' | 'managed'): string {
	if (type === 'vps' || type === 'managed') {
		return locale === 'ro' ? 'Configureaza' : locale === 'en' ? 'Configure' : 'Konfigurieren';
	}
	return locale === 'ro' ? 'Solicita configurare' : locale === 'en' ? 'Request setup' : 'Konfiguration anfragen';
}

async function fetchByGroup(groupName: string): Promise<DbProduct[]> {
	const pool = getPool();
	if (!pool) {
		console.warn('[plans] No DB pool — DATABASE_URL missing?');
		return [];
	}

	try {
		const { rows } = await pool.query<DbProduct>(
			`SELECT p.id, p.name, p.description, p.product_type, p.pricing, p.config_options, p.sort_order
			 FROM products p
			 JOIN product_groups pg ON p.product_group_id = pg.id
			 WHERE pg.name = $1
			   AND p.is_hidden  = false
			   AND p.is_disabled = false
			   AND p.is_retired  = false
			 ORDER BY p.sort_order, p.name`,
			[groupName],
		);
		return rows;
	} catch (err) {
		console.error('[plans] DB query failed for group', groupName, err);
		return [];
	}
}

export async function getSharedPlansFromDb(locale: Locale): Promise<PricingPlan[]> {
	const rows = await fetchByGroup('Shared Hosting');
	return rows.map((row, index) => ({
		name: row.name,
		description: '',
		priceEur: row.pricing.monthly ?? 0,
		accent: index === 1,
		cta: ctaLabel(locale, 'shared'),
		features: buildFeatures(row),
	}));
}

export async function getVpsPlansFromDb(locale: Locale): Promise<PricingPlan[]> {
	const rows = await fetchByGroup('VPS Hosting');
	return rows.map((row, index) => ({
		name: row.name,
		description: '',
		priceEur: row.pricing.monthly ?? 0,
		accent: index === 0,
		cta: ctaLabel(locale, 'vps'),
		features: buildFeatures(row),
	}));
}

export async function getManagedPlansFromDb(locale: Locale): Promise<PricingPlan[]> {
	const rows = await fetchByGroup('Managed Hosting');
	return rows.map((row, index) => ({
		name: row.name,
		description: '',
		priceEur: row.pricing.monthly ?? 0,
		accent: index === 0,
		cta: ctaLabel(locale, 'managed'),
		features: buildFeatures(row),
	}));
}
