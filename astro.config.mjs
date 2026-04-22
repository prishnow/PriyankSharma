// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  integrations: [react(), mdx()],
  // 301 permanent redirects from the old /notes URL space to /thinking.
  // Astro emits <meta http-equiv="refresh"> + a small JS fallback in static
  // output, and Cloudflare Pages honours the status code for crawlers.
  redirects: {
    '/notes':        { destination: '/thinking', status: 301 },
    '/notes/[slug]': { destination: '/thinking/[slug]', status: 301 },
  },
});
