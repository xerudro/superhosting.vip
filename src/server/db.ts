import { Pool } from 'pg';

let pool: Pool | null = null;

function resolveSsl(connectionString: string) {
	const raw = import.meta.env.DATABASE_SSL?.trim().toLowerCase();
	if (raw === 'false' || raw === '0' || raw === 'off' || raw === 'no') {
		return false;
	}
	if (raw === 'true' || raw === '1' || raw === 'on' || raw === 'yes') {
		return { rejectUnauthorized: false };
	}
	return connectionString.includes('localhost') || connectionString.includes('127.0.0.1')
		? false
		: { rejectUnauthorized: false };
}

export function getPool() {
	const connectionString = import.meta.env.DATABASE_URL;
	if (!connectionString) {
		return null;
	}

	if (!pool) {
		pool = new Pool({
			connectionString,
			ssl: resolveSsl(connectionString),
		});
	}

	return pool;
}

let supportTablesReady = false;

export async function ensureSupportTables() {
	const activePool = getPool();
	if (!activePool || supportTablesReady) {
		return;
	}

	await activePool.query(`
		create table if not exists customer_sessions (
			id uuid primary key,
			customer_id uuid not null references customers(id) on delete cascade,
			token_hash varchar(255) not null unique,
			ip_address varchar(255),
			user_agent text,
			expires_at timestamp without time zone not null,
			created_at timestamp without time zone not null default now(),
			revoked_at timestamp without time zone
		)
	`);

	await activePool.query(`
		create table if not exists service_requests (
			id uuid primary key,
			request_type varchar(64) not null,
			name varchar(255) not null,
			email varchar(255) not null,
			company varchar(255),
			message text not null,
			summary text,
			created_at timestamp with time zone not null default now()
		)
	`);

	supportTablesReady = true;
}
