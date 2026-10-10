// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// When deploying to GitHub Pages:
// - Repo named `<username>.github.io`  -> site: 'https://<username>.github.io', no `base`.
// - Any other repo name (e.g. `portfolio`) -> also set base: '/portfolio'.
export default defineConfig({
  site: 'https://priyanshi8806.github.io',
  // base: '/portfolio',
  integrations: [mdx(), sitemap()],
});
