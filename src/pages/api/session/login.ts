import type { APIRoute } from 'astro';
import { withLocale } from '@/lib/i18n';
import { loginUser } from '@/server/auth';

export const POST: APIRoute = async (context) => {
	const form = await context.request.formData();
	const locale = String(form.get('locale') ?? 'ro');
	try {
		await loginUser(context, {
			email: String(form.get('email') ?? ''),
			password: String(form.get('password') ?? ''),
		});
		return context.redirect(withLocale(locale as any, '/account?status=logged-in'));
	} catch (error) {
		const message = error instanceof Error ? error.message : 'Unable to login.';
		return context.redirect(withLocale(locale as any, `/login?error=${encodeURIComponent(message)}`));
	}
};
