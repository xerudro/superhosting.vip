import type { APIRoute } from 'astro';
import { withLocale } from '@/lib/i18n';
import { updatePassword } from '@/server/auth';

export const POST: APIRoute = async (context) => {
	if (!context.locals.user) {
		return new Response('Unauthorized', { status: 401 });
	}
	const form = await context.request.formData();
	try {
		await updatePassword(context.locals.user.id, {
			currentPassword: String(form.get('currentPassword') ?? ''),
			newPassword: String(form.get('newPassword') ?? ''),
		});
		return context.redirect(withLocale(context.locals.user.locale, '/account?status=password-updated'));
	} catch (error) {
		const message = error instanceof Error ? error.message : 'Unable to update password.';
		return context.redirect(withLocale(context.locals.user.locale, `/account?error=${encodeURIComponent(message)}`));
	}
};
