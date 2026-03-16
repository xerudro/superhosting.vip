import type { APIRoute } from 'astro';
import { getCurrencyForLocale, isCurrency } from '@/lib/currency';
import { isLocale } from '@/lib/i18n';

export const POST: APIRoute = async ({ request, cookies }) => {
	const body = await request.json().catch(() => null);
	if (!body || typeof body.kind !== 'string' || typeof body.value !== 'string') {
		return new Response('Bad request', { status: 400 });
	}
	if (body.kind === 'locale' && isLocale(body.value)) {
		cookies.set('svh_locale', body.value, { path: '/', sameSite: 'lax', maxAge: 60 * 60 * 24 * 365 });
		cookies.set('svh_currency', getCurrencyForLocale(body.value), { path: '/', sameSite: 'lax', maxAge: 60 * 60 * 24 * 365 });
		return new Response(null, { status: 204 });
	}
	if (body.kind === 'currency' && isCurrency(body.value)) {
		cookies.set('svh_currency', body.value, { path: '/', sameSite: 'lax', maxAge: 60 * 60 * 24 * 365 });
		return new Response(null, { status: 204 });
	}
	return new Response('Bad request', { status: 400 });
};
