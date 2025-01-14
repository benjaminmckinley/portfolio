import { glob } from "astro/loaders";
import { z, defineCollection } from "astro:content";
import type { Project } from "./_projects/project";
import { ZodType } from "zod";
import type { Article } from "./_blog/post";

const blog = defineCollection<ZodType<Article>>({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/_blog" }),
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
    description: z.string(),
    author: z.string(),
    image: z.object({
      url: z.string(),
      alt: z.string(),
    }),
    tags: z.array(z.string()),
  }),
});

const projects = defineCollection<ZodType<Project>>({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/_projects" }),
  schema: z.object({
    title: z.string(),
    date: z.union([
      z.date(),
      z.object({
        startDate: z.date(),
        endDate: z.date(),
      }),
    ]),
    description: z.string(),
    author: z.string(),
    image: z.object({
      url: z.string(),
      alt: z.string(),
    }),
    url: z.string(),
    tags: z.array(z.string()),
  }),
});

export const collections = { blog, projects };
