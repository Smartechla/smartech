// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  site: "http://reporte.smartech.com",
  output: 'server',
  integrations: [react()],
  adapter: node({
    mode: 'standalone'
  }),
  security:{
    checkOrigin: false
  },
  server: {
    host: true,
    allowedHosts: true
  }
});