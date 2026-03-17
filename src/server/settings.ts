import { getPool } from './db';

const DEFAULT_RON_RATE = 5.10;

async function ensureSettingsTable() {
	const pool = getPool();
	if (!pool) return;
	await pool.query(`
		CREATE TABLE IF NOT EXISTS site_settings (
			key   VARCHAR(128) PRIMARY KEY,
			value TEXT NOT NULL,
			updated_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW()
		)
	`);
}

export async function getSetting(key: string, fallback: string): Promise<string> {
	const pool = getPool();
	if (!pool) return fallback;
	try {
		await ensureSettingsTable();
		const { rows } = await pool.query<{ value: string }>(
			'SELECT value FROM site_settings WHERE key = $1',
			[key],
		);
		return rows[0]?.value ?? fallback;
	} catch {
		return fallback;
	}
}

export async function setSetting(key: string, value: string): Promise<void> {
	const pool = getPool();
	if (!pool) throw new Error('No DB connection');
	await ensureSettingsTable();
	await pool.query(
		`INSERT INTO site_settings (key, value, updated_at)
		 VALUES ($1, $2, NOW())
		 ON CONFLICT (key) DO UPDATE SET value = $2, updated_at = NOW()`,
		[key, value],
	);
}

export async function getRonRate(): Promise<number> {
	const raw = await getSetting('exchange_rate_ron', String(DEFAULT_RON_RATE));
	const parsed = parseFloat(raw);
	return isNaN(parsed) || parsed <= 0 ? DEFAULT_RON_RATE : parsed;
}
