// @ts-check
import {defineConfig} from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from "rehype-slug";

// https://astro.build/config
export default defineConfig({
    integrations: [react(), sitemap(), tailwind({
        nesting: true,
    },),
    ],
    // site: "https://benjaminmckinley.com",
    site: "https://benjaminmckinley.github.io",
    base: '.',
    markdown: {
        rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: 'prepend', content: {
                type: 'element',
                tagName: 'span',
                children: [{ type: 'text', value: '# ' }]
            }
        }]],
    },
    experimental: {
        svg: true,
    },
});