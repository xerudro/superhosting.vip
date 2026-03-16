import { randomUUID } from 'node:crypto';
import { z } from 'zod';
import { ensureSupportTables, getPool } from '@/server/db';
import { createMockLead } from '@/server/mock-store';

const leadSchema = z.object({
	type: z.enum(['contact', 'shared-config', 'vps-config']),
	name: z.string().min(2),
	email: z.email(),
	company: z.string().optional().default(''),
	message: z.string().min(10),
	summary: z.string().optional().default(''),
});

export async function createLead(payload: unknown) {
	const input = leadSchema.parse(payload);
	const pool = getPool();
	if (!pool) {
		createMockLead(input.type, input);
		return;
	}
	await ensureSupportTables();
	await pool.query(
		`insert into service_requests (id, request_type, name, email, company, message, summary, created_at)
		 values ($1, $2, $3, $4, $5, $6, $7, now())`,
		[randomUUID(), input.type, input.name, input.email, input.company, input.message, input.summary],
	);
}
