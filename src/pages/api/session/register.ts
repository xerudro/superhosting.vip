import type { APIRoute } from 'astro';
import { withLocale } from '@/lib/i18n';
import { registerUser } from '@/server/auth';

export const POST: APIRoute = async (context) => {
	const form = await context.request.formData();
	const locale = String(form.get('locale') ?? 'ro');
	try {
		await registerUser(context, {
			email: String(form.get('email') ?? ''),
			password: String(form.get('password') ?? ''),
			fullName: String(form.get('fullName') ?? ''),
			companyName: String(form.get('companyName') ?? ''),
			phone: String(form.get('phone') ?? ''),
			locale,
			currency: String(form.get('currency') ?? 'RON'),
		});
		return context.redirect(withLocale(locale as any, '/account?status=registered'));
	} catch (error) {
		const message = error instanceof Error ? error.message : 'Unable to register.';
		return context.redirect(withLocale(locale as any, `/register?error=${encodeURIComponent(message)}`));
	}
};
