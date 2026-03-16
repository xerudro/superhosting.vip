import type { APIRoute } from 'astro';
import { withLocale } from '@/lib/i18n';
import { createLead } from '@/server/leads';

export const POST: APIRoute = async (context) => {
	const form = await context.request.formData();
	const locale = context.locals.locale ?? 'ro';
	try {
		await createLead({
			type: String(form.get('type') ?? 'contact'),
			name: String(form.get('name') ?? ''),
			email: String(form.get('email') ?? ''),
			company: String(form.get('company') ?? ''),
			message: String(form.get('message') ?? ''),
			summary: String(form.get('summary') ?? ''),
		});
		return context.redirect(withLocale(locale, '/contact?status=sent'));
	} catch (error) {
		const message = error instanceof Error ? error.message : 'Unable to save request.';
		return context.redirect(withLocale(locale, `/contact?error=${encodeURIComponent(message)}`));
	}
};
