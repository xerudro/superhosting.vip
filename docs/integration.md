# Superhosting Integration Notes

## Runtime model

- Public website: Astro SSR / BFF layer
- Account and authentication: Astro route handlers with secure cookies
- Database: PostgreSQL through `DATABASE_URL`
- Control panel bridge: external URL via `CONTROL_PANEL_URL`
- Webmail bridge: external URL via `WEBMAIL_URL`

## Setup

1. Copy `.env.example` to `.env`.
2. Provide `DATABASE_URL`.
3. Apply [bootstrap.sql](/D:/WEBSITE/superhosting.vip/sql/bootstrap.sql) if `customer_sessions` and `service_requests` do not already exist in your database.
4. Set production URLs for control panel and webmail.

## Notes

- The public website must stay provider-agnostic for VPS copy and marketing pages.
- Infrastructure-provider details may exist in internal backend docs only.
- If `DATABASE_URL` is missing, the app falls back to in-memory mock mode so the UI and flows can still be reviewed locally.
- Public customer auth maps to `customers`; account service summaries map to `hosting_services` plus `products`.
