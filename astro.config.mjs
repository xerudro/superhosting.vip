// @ts-check
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	site: 'https://superhosting.vip',
	output: 'server',
	adapter: node({
		mode: 'standalone',
	}),
	integrations: [sitemap()],
	vite: {
		resolve: {
			alias: {
				'@': new URL('./src', import.meta.url).pathname,
			},
		},
	},
});
