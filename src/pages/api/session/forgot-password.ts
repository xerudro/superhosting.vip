import type { APIRoute } from 'astro';
import { withLocale } from '@/lib/i18n';

export const POST: APIRoute = async (context) => {
	const form = await context.request.formData();
	const locale = String(form.get('locale') ?? 'ro');
	return context.redirect(withLocale(locale as any, '/forgot-password?status=sent'));
};
