import type { APIRoute } from 'astro';
import { withLocale } from '@/lib/i18n';
import { logoutUser } from '@/server/auth';

export const POST: APIRoute = async (context) => {
	const form = await context.request.formData();
	const locale = String(form.get('locale') ?? 'ro');
	await logoutUser(context);
	return context.redirect(withLocale(locale as any, '/login?status=logged-out'));
};
