import { defineMiddleware } from 'astro:middleware';
import type { AstroCookies } from 'astro';
import { getCurrencyForLocale } from '@/lib/currency';
import { defaultLocale, getLocaleFromPath, isLocale, withLocale } from '@/lib/i18n';
import { getSessionUser } from '@/server/auth';

const bareRoutes = new Set([
	'/shared-hosting',
	'/vps-hosting',
	'/server-administration',
	'/web-design',
	'/about',
	'/contact',
	'/legal',
	'/login',
	'/register',
	'/forgot-password',
	'/account',
]);

function getPreferredLocale(request: Request, cookies: AstroCookies) {
	const cookieLocale = cookies.get('svh_locale')?.value;
	if (isLocale(cookieLocale)) {
		return cookieLocale;
	}
	const language = request.headers.get('accept-language')?.split(',')[0]?.slice(0, 2);
	return isLocale(language) ? language : defaultLocale;
}

export const onRequest = defineMiddleware(async (context, next) => {
	const pathname = new URL(context.request.url).pathname;
	if (pathname === '/') {
		return context.redirect(withLocale(getPreferredLocale(context.request, context.cookies), '/'));
	}
	if (bareRoutes.has(pathname)) {
		return context.redirect(withLocale(getPreferredLocale(context.request, context.cookies), pathname));
	}

	const locale = getLocaleFromPath(pathname) ?? getPreferredLocale(context.request, context.cookies);
	context.locals.locale = locale;
	context.locals.currency = getCurrencyForLocale(locale);
	context.locals.user = await getSessionUser(context.cookies);

	if (pathname.match(/^\/(ro|en|de)\/account/) && !context.locals.user) {
		return context.redirect(withLocale(locale, '/login?error=auth'));
	}

	const response = await next();
	response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
	response.headers.set('X-Content-Type-Options', 'nosniff');
	response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
	response.headers.set('X-Frame-Options', 'DENY');
	response.headers.set(
		'Content-Security-Policy',
		"default-src 'self'; img-src 'self' data: https:; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; connect-src 'self'; frame-ancestors 'none'; form-action 'self'; base-uri 'self';",
	);
	return response;
});
