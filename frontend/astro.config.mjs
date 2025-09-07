// astro.config.mjs
import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
// Remueve el import del adapter de Vercel

export default defineConfig({
  integrations: [svelte()],
  output: 'static' // Cambia a static
  // Remueve la línea del adapter
});