import type { APIRoute } from 'astro';
import { setSetting } from '@/server/settings';

export const POST: APIRoute = async ({ request, locals, redirect }) => {
	const adminEmail = import.meta.env.ADMIN_EMAIL;
	if (!locals.user || !adminEmail || locals.user.email !== adminEmail) {
		return new Response('Unauthorized', { status: 401 });
	}

	const form = await request.formData();
	const raw = form.get('ronRate');
	const rate = parseFloat(String(raw ?? ''));

	if (isNaN(rate) || rate <= 0 || rate > 100) {
		return redirect(`/${locals.locale}/admin?error=invalid-rate`);
	}

	await setSetting('exchange_rate_ron', rate.toFixed(4));
	return redirect(`/${locals.locale}/admin?status=rate-updated`);
};
