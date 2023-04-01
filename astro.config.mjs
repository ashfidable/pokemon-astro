import { defineConfig } from 'astro/config';

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: 'https://ashfidable.github.io',
  base: '/pokemon-astro',
  integrations: [tailwind()]
});