import { glob } from "astro/loaders";
import { z, defineCollection } from "astro:content";
import { ZodType } from "zod";
import type { Post } from "./pages/blog/post";
import type { Project } from "./pages/projects/project";

const blog = defineCollection<ZodType<Post>>({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/_blog" }),
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
    description: z.string(),
    author: z.string(),
    image: z.object({
      url: z.string().url(),
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
      z.coerce.date(),
      z
        .object({
          startDate: z.coerce.date(),
          endDate: z.coerce.date(),
        })
        .refine((value) => {
          return value.startDate <= value.endDate;
        }),
    ]),
    description: z.string(),
    author: z.string(),
    image: z.object({
      url: z.string().url(),
      alt: z.string(),
    }),
    url: z.string().url(),
    tags: z.array(z.string()),
    affiliation: z.string().optional(),
  }),
});

export const collections = { blog, projects };
