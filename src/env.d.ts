declare namespace App {
	interface Locals {
		locale: import('@/lib/i18n').Locale;
		currency: import('@/lib/currency').Currency;
		user: import('@/server/auth').SessionUser | null;
		ronRate: number;
	}
}

interface ImportMetaEnv {
	readonly SITE_URL?: string;
	readonly DATABASE_URL?: string;
	readonly DATABASE_SSL?: string;
	readonly SESSION_COOKIE_NAME?: string;
	readonly SESSION_TTL_HOURS?: string;
	readonly APP_NAME?: string;
	readonly CONTROL_PANEL_URL?: string;
	readonly WEBMAIL_URL?: string;
	readonly ALLOW_MOCK_DATA?: string;
	readonly ADMIN_EMAIL?: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
