import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import svelte from "@astrojs/svelte";

import image from "@astrojs/image";

// https://astro.build/config
export default defineConfig({
  site: 'https://ashfidable.github.io',
  base: '/pokemon-astro',
  integrations: [tailwind(), svelte(), image(
    { serviceEntryPoint: '@astrojs/image/sharp' }
  )]
});