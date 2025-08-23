// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import { loadEnv } from "vite";

const { BASE_URL } = loadEnv(process.env.NODE_ENV, process.cwd(), "");

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    sitemap(),
    tailwind({
      nesting: true,
    }),
  ],
  site: BASE_URL,
  markdown: {
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: "prepend",
          content: {
            type: "element",
            tagName: "span",
            children: [{ type: "text", value: "#" }],
          },
        },
      ],
    ],
  },
});
