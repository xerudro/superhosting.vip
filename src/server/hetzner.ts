const HETZNER_API = 'https://api.hetzner.cloud/v1';
const MARKUP = 1.40; // 40% margin on top of Hetzner price
const BACKUP_RATE = 0.20; // 20% of VPS price for backups

export interface HetznerServerType {
	name: string;
	description: string;
	cores: number;
	memory: number;
	disk: number;
	cpu_type: string;
	architecture: string;
	is_deprecated: boolean;
	priceMonthlyNet: number;  // Hetzner base price
	priceMonthlyFinal: number; // with 40% markup
	backupPriceMonthly: number; // 20% of final price
}

interface HetznerApiServerType {
	name: string;
	description: string;
	cores: number;
	memory: number;
	disk: number;
	cpu_type: string;
	architecture: string;
	is_deprecated: boolean;
	prices: Array<{
		location: string;
		price_monthly: { net: string; gross: string };
	}>;
}

let _cache: HetznerServerType[] | null = null;
let _cacheAt = 0;
const CACHE_TTL = 10 * 60 * 1000; // 10 min

export async function getHetznerServerTypes(): Promise<HetznerServerType[]> {
	if (_cache && Date.now() - _cacheAt < CACHE_TTL) return _cache;

	const apiKey = import.meta.env.HETZNER_API_KEY;
	if (!apiKey) {
		console.warn('[hetzner] HETZNER_API_KEY not set');
		return [];
	}

	try {
		const res = await fetch(`${HETZNER_API}/server_types?per_page=50`, {
			headers: { Authorization: `Bearer ${apiKey}` },
		});
		if (!res.ok) throw new Error(`Hetzner API ${res.status}`);
		const data = await res.json() as { server_types: HetznerApiServerType[] };

		_cache = data.server_types
			.filter((t) => !t.is_deprecated)
			.map((t) => {
				// prefer fsn1 (Frankfurt) price, fallback to first available
				const priceEntry =
					t.prices.find((p) => p.location === 'fsn1') ?? t.prices[0];
				const net = parseFloat(priceEntry?.price_monthly?.net ?? '0');
				const final = Math.ceil(net * MARKUP * 100) / 100;
				return {
					name: t.name,
					description: t.description,
					cores: t.cores,
					memory: t.memory,
					disk: t.disk,
					cpu_type: t.cpu_type,
					architecture: t.architecture,
					is_deprecated: t.is_deprecated,
					priceMonthlyNet: net,
					priceMonthlyFinal: final,
					backupPriceMonthly: Math.ceil(final * BACKUP_RATE * 100) / 100,
				};
			});
		_cacheAt = Date.now();
		return _cache;
	} catch (err) {
		console.error('[hetzner] Failed to fetch server types:', err);
		return _cache ?? [];
	}
}

export async function getHetznerServerType(name: string): Promise<HetznerServerType | undefined> {
	const types = await getHetznerServerTypes();
	return types.find((t) => t.name === name);
}
