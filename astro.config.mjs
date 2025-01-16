// @ts-check
import { defineConfig } from "astro/config";

import react from "@astrojs/react";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  integrations: [react(), sitemap()],
  // site: "https://benjaminmckinley.com",
  site: "https://benjaminmckinley.github.io",
  base: 'portfolio',
  experimental: {
    svg: true,
  },
});