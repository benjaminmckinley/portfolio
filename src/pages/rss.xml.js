import rss, { pagesGlobToRssItems } from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context) {
  const posts = await getCollection("blog");

  return rss({
    title: "Benjamin McKinley | Blog",
    description: "TODO",
    site: context.site,
    // items: await pagesGlobToRssItems(import.meta.glob('./**/*.md')),
    items: posts.map((post) => {
      return {
        title: post.data.title,
        pubDate: post.data.pubDate,
        description: post.data.description,
        link: `/posts/${post.id}/`,
      };
    }),
    customData: `<language>en-us</language>`,
  });
}
