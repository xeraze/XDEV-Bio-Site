import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://xeraze.github.io',
  base: '/XDEV-Bio-Site',
  compressHTML: true,
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ru'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});