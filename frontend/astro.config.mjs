import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

import react from '@astrojs/react';

export default defineConfig({
  // Solo si necesitas SSR
  output: 'server',

  adapter: vercel(),
  integrations: [react()]
});