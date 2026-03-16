create table if not exists customer_sessions (
	id uuid primary key,
	customer_id uuid not null references customers(id) on delete cascade,
	token_hash text not null unique,
	ip_address varchar(255),
	user_agent text,
	expires_at timestamp without time zone not null,
	created_at timestamp without time zone not null default now(),
	revoked_at timestamp without time zone
);

create table if not exists service_requests (
	id uuid primary key,
	request_type text not null,
	name text not null,
	email text not null,
	company text default '',
	message text not null,
	summary text default '',
	created_at timestamptz not null default now()
);
