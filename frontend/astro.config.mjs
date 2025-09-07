import { defineConfig } from 'astro/config'   // ← ESTA LÍNEA ES CLAVE
import vercel from "@astrojs/vercel"
import svelte from '@astrojs/svelte'

export default defineConfig({
  output: 'server',
  adapter: vercel(),
  integrations: [svelte()],
})
