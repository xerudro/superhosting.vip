import type { APIRoute } from 'astro';
import { withLocale } from '@/lib/i18n';
import { updateProfile } from '@/server/auth';

export const POST: APIRoute = async (context) => {
	if (!context.locals.user) {
		return new Response('Unauthorized', { status: 401 });
	}
	const form = await context.request.formData();
	const locale = String(form.get('locale') ?? context.locals.user.locale);
	try {
		await updateProfile(context.locals.user.id, {
			fullName: String(form.get('fullName') ?? ''),
			companyName: String(form.get('companyName') ?? ''),
			phone: String(form.get('phone') ?? ''),
			locale,
			currency: String(form.get('currency') ?? context.locals.user.currency),
		});
		context.cookies.set('svh_locale', locale, { path: '/', sameSite: 'lax', maxAge: 60 * 60 * 24 * 365 });
		context.cookies.set('svh_currency', String(form.get('currency') ?? context.locals.user.currency), {
			path: '/',
			sameSite: 'lax',
			maxAge: 60 * 60 * 24 * 365,
		});
		return context.redirect(withLocale(locale as any, '/account?status=profile-updated'));
	} catch (error) {
		const message = error instanceof Error ? error.message : 'Unable to update profile.';
		return context.redirect(withLocale(locale as any, `/account?error=${encodeURIComponent(message)}`));
	}
};
