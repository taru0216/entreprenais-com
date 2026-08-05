// astro.config.mjs — entreprenais-cloud-astro
// Generated for entreprenais.com/cloud LP (#303)
import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  // GitHub Pages (deploy-cloud.yml): ASTRO_BASE=/cloud
  base: process.env.ASTRO_BASE || '/',
});
