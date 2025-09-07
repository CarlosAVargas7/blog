import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/serverless'; // o .static si no usas SSR
import svelte from '@astrojs/svelte';

// https://astro.build/config
export default defineConfig({

  output: 'server', // o 'static', permite SSR + prerender(static)
  // Con output: 'server', puedes usar prerender = true/false por página.
  // export const prerender = false; // fuerza SSR

  adapter: vercel(),
  integrations: [svelte()]
});