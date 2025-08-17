import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import sanitizeHtml from "sanitize-html";
import MarkdownIt from "markdown-it";
import * as dotenv from "dotenv";

dotenv.config();

const parser = new MarkdownIt();

export async function GET(context) {
  const posts = await getCollection("blog");

  return rss({
    title: "Benjamin McKinley | Blog",
    description: "Personal Writing",
    site: process.env.BASE_URL ?? "",
    items: posts.map((post) => {
      return {
        title: post.data.title,
        pubDate: post.data.pubDate,
        description: post.data.description,
        link: `/posts/${post.id}/`,
        content: sanitizeHtml(parser.render(post.body), {
          allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
        }),
      };
    }),
    customData: `<language>en-us</language>`,
  });
}
