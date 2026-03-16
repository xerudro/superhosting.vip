# VIP Super Hosting

Astro SSR website for `superhosting.vip`, built as a multi-page, multi-language and multi-currency marketing site with a companion account layer.

## Stack

- Astro 6 with Node adapter
- TypeScript
- PostgreSQL bridge through SSR route handlers
- RO / EN / DE localized routing
- RON / EUR / USD currency switching

## Commands

- `npm install`
- `npm run dev`
- `npm run check`
- `npm run build`
- `npm run preview`

## Environment

Copy `.env.example` to `.env` and set:

- `DATABASE_URL`
- `CONTROL_PANEL_URL`
- `WEBMAIL_URL`
- `SITE_URL`

If `DATABASE_URL` is missing, the app falls back to in-memory mock data for local UI review.

## Database

Bootstrap tables for the public account layer and lead capture are in [sql/bootstrap.sql](/D:/WEBSITE/superhosting.vip/sql/bootstrap.sql).

Integration notes are in [docs/integration.md](/D:/WEBSITE/superhosting.vip/docs/integration.md).
