import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import svelte from '@astrojs/svelte';

export default defineConfig({
  integrations: [svelte()],
  output: 'server', // o 'hybrid' si quieres mezclar páginas estáticas y dinámicas
  adapter: vercel()
});