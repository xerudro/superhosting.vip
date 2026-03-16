export const locales = ['ro', 'en', 'de'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'ro';

export const localeLabels: Record<Locale, string> = {
	ro: 'Romana',
	en: 'English',
	de: 'Deutsch',
};

export function isLocale(value: string | undefined | null): value is Locale {
	return Boolean(value && locales.includes(value as Locale));
}

export function normalizeLocale(value: string | undefined | null): Locale {
	return isLocale(value) ? value : defaultLocale;
}

export function getLocaleFromPath(pathname: string): Locale | null {
	const segment = pathname.split('/').filter(Boolean)[0];
	return isLocale(segment) ? segment : null;
}

export function stripLocale(pathname: string): string {
	const parts = pathname.split('/').filter(Boolean);
	if (parts.length === 0) {
		return '/';
	}
	if (isLocale(parts[0])) {
		const rest = parts.slice(1).join('/');
		return rest ? `/${rest}` : '/';
	}
	return pathname.startsWith('/') ? pathname : `/${pathname}`;
}

export function withLocale(locale: Locale, pathname = '/'): string {
	const stripped = stripLocale(pathname);
	if (stripped === '/') {
		return `/${locale}/`;
	}
	return `/${locale}${stripped}`;
}
