import type { APIRoute } from 'astro';
import { setSetting } from '@/server/settings';
import { invalidateHetznerCache } from '@/server/hetzner';

export const POST: APIRoute = async ({ request, locals, redirect }) => {
	const adminEmail = import.meta.env.ADMIN_EMAIL;
	if (!locals.user || !adminEmail || locals.user.email !== adminEmail) {
		return new Response('Unauthorized', { status: 401 });
	}

	const form = await request.formData();
	const raw = form.get('markupPercent');
	const percent = parseFloat(String(raw ?? ''));

	if (isNaN(percent) || percent < 0 || percent > 500) {
		return redirect(`/${locals.locale}/admin?error=invalid-markup`);
	}

	await setSetting('hetzner_markup_percent', percent.toFixed(2));
	invalidateHetznerCache();
	return redirect(`/${locals.locale}/admin?status=markup-updated`);
};
