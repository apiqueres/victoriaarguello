import { defineConfig } from 'astro/config';

export default defineConfig({
  // SITE_URL / BASE_PATH are set by the GitHub Pages workflow; defaults are for the final domain.
  site: process.env.SITE_URL ?? 'https://victoriaarguello.com',
  base: process.env.BASE_PATH ?? '/',
  server: { port: 4321 },
  devToolbar: { enabled: false },
});
