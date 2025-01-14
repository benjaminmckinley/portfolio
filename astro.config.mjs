// @ts-check
import { defineConfig } from "astro/config";

import react from "@astrojs/react";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [react(), tailwind({
    nesting: true,
  })],
  site: "https://example.com",
  experimental: {
    svg: true
  }
});