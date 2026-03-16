import { randomUUID } from 'node:crypto';

type MockUser = {
	id: string;
	email: string;
	passwordHash: string;
	fullName: string;
	companyName: string;
	phone: string;
	locale: string;
	currency: string;
	avatarDataUrl: string | null;
	createdAt: string;
};

type MockSession = {
	id: string;
	userId: string;
	tokenHash: string;
	expiresAt: number;
};

type MockLead = {
	id: string;
	type: string;
	payload: Record<string, unknown>;
	createdAt: string;
};

type MockStore = {
	users: Map<string, MockUser>;
	sessions: Map<string, MockSession>;
	leads: MockLead[];
};

declare global {
	var __superhostingMockStore__: MockStore | undefined;
}

export function getMockStore() {
	if (!globalThis.__superhostingMockStore__) {
		globalThis.__superhostingMockStore__ = {
			users: new Map(),
			sessions: new Map(),
			leads: [],
		};
	}

	return globalThis.__superhostingMockStore__;
}

export function createMockLead(type: string, payload: Record<string, unknown>) {
	const store = getMockStore();
	store.leads.push({
		id: randomUUID(),
		type,
		payload,
		createdAt: new Date().toISOString(),
	});
}
