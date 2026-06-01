import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  // Docker (eai-systemctl): ASTRO_BASE 未設定 → base: '/' (ルート)
  // GitHub Pages (sites/banwaen-ikebukuro/): deploy workflow で ASTRO_BASE=/sites/banwaen-ikebukuro を設定
  base: process.env.ASTRO_BASE || '/',
  build: {
    outDir: 'dist',
  },
  i18n: {
    defaultLocale: 'ja',
    locales: ['ja', 'en', 'ko', 'zh-cn', 'zh-tw', 'th', 'vi', 'id'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
