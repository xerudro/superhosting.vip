---
name: astro-website-setup-security-performance
description: Set up, harden, audit, and prepare Astro websites for deployment with a repeatable focus on security, performance, accessibility, and release readiness. Use when working on an Astro project in this workspace to initialize the site, review or improve production configuration, remove unsafe defaults, optimize assets and rendering, verify SEO and accessibility basics, or create a pre-deployment checklist.
---

# Astro Website Setup Security Performance

## Overview

Use this skill to handle end-to-end Astro website setup and audits in this workspace.
Follow the checklist for quick reviews, then run the detailed workflow when preparing a site for production.

## Quick Checklist

- Confirm the Astro project is initialized and dependencies install cleanly.
- Confirm Git, `.gitignore`, and `.env` handling are set up correctly.
- Enforce HTTPS and secure response headers.
- Audit dependencies and remove unnecessary packages.
- Remove demo or starter content before release.
- Enable image optimization and compress large assets.
- Minify HTML, CSS, and JavaScript for production builds.
- Choose static output or SSR intentionally; do not leave it implicit.
- Add caching for static assets and lazy-load non-critical media.
- Check accessibility, SEO metadata, and mobile behavior.
- Verify deployment automation and basic monitoring.

## Workflow

### 1. Initialize the project

- Detect whether the workspace already contains an Astro app before scaffolding anything.
- Create or complete version control setup.
- Review environment-variable usage; keep secrets in `.env` files and verify `.gitignore` covers them.
- Record the intended deployment target early because adapter, output mode, and headers depend on it.

### 2. Harden the site

- Remove starter pages, sample posts, placeholder assets, and unused integrations.
- Review `astro.config.*`, hosting config, and middleware for HTTPS enforcement and header coverage.
- Prefer explicit headers such as CSP, HSTS, `X-Content-Type-Options`, `Referrer-Policy`, and `X-Frame-Options` or `frame-ancestors` through CSP when the platform supports them.
- Inspect third-party scripts, embeds, and analytics. Keep only required integrations.
- Audit dependencies with the repo's package manager and upgrade or remove vulnerable packages.

### 3. Optimize performance

- Use Astro image tooling or the platform's image pipeline instead of shipping oversized originals.
- Ensure production builds enable minification and compression.
- Decide between static generation and SSR based on content freshness and personalization needs.
- Cache immutable assets aggressively and keep HTML caching aligned with content update frequency.
- Lazy-load below-the-fold media and defer non-critical scripts.
- Measure bundle size and avoid client-side hydration where server-rendered HTML is sufficient.

### 4. Verify quality

- Check page titles, meta descriptions, canonical URLs, social metadata, sitemap, and robots behavior.
- Run accessibility checks for landmarks, heading order, keyboard access, contrast, and alt text.
- Test responsive behavior on narrow and wide viewports.
- Run Lighthouse or equivalent audits and fix the largest regressions first.

### 5. Prepare deployment

- Confirm the build command, output directory, adapter, and runtime match the hosting platform.
- Configure redirects, cache rules, and headers in deployment config rather than relying on ad hoc manual setup.
- Add automated deployment only after the production build is reproducible locally.
- Set up basic uptime, error, and performance monitoring after launch.

## Completion Criteria

- Complete every item in the quick checklist or document why it does not apply.
- Leave no demo content, unused integration, or obvious security misconfiguration in production code.
- Verify the site passes a production build and basic audit checks.
- Confirm deployment settings are consistent with the chosen hosting target.

## Example Prompts

- `Guide me through a secure Astro site setup.`
- `Audit this Astro project for security and performance issues before deployment.`
- `Run the Astro production-readiness checklist for this workspace.`
- `What should I fix before deploying this Astro site?`
