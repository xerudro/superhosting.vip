import type { APIRoute } from 'astro';
import { withLocale } from '@/lib/i18n';
import { updateAvatar } from '@/server/auth';

export const POST: APIRoute = async (context) => {
	if (!context.locals.user) {
		return new Response('Unauthorized', { status: 401 });
	}
	const form = await context.request.formData();
	const file = form.get('avatar');
	if (!(file instanceof File) || file.size === 0) {
		return context.redirect(withLocale(context.locals.user.locale, '/account?error=Avatar%20missing'));
	}
	if (!file.type.startsWith('image/') || file.size > 1_000_000) {
		return context.redirect(withLocale(context.locals.user.locale, '/account?error=Avatar%20must%20be%20an%20image%20under%201MB'));
	}
	const buffer = Buffer.from(await file.arrayBuffer());
	await updateAvatar(context.locals.user.id, `data:${file.type};base64,${buffer.toString('base64')}`);
	return context.redirect(withLocale(context.locals.user.locale, '/account?status=avatar-updated'));
};
