import { brand } from '@/lib/site';
import type { Locale } from '@/lib/i18n';

export function createSeo(locale: Locale, path: string, title: string, description: string) {
	const base = import.meta.env.SITE_URL ?? `https://${brand.domain}`;
	const canonical = new URL(path, base).toString();
	return {
		title,
		description,
		canonical,
		languages: {
			ro: canonical.replace(`/${locale}/`, '/ro/'),
			en: canonical.replace(`/${locale}/`, '/en/'),
			de: canonical.replace(`/${locale}/`, '/de/'),
		},
	};
}
