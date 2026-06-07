import { z } from "zod";
import type { InferEntrySchema } from "astro:content";

export const blogSchema = z
  .object({
    author: z.string().optional(),
    date_published: z.coerce.date(),
    date_updated: z.coerce.date().optional(),
    title: z.string(),
    postSlug: z.string().optional(),
    featured: z.boolean().optional(),
    draft: z.boolean().optional(),
    tags: z.array(z.string()).default(["others"]),
    ogImage: z.string().optional(),
    description: z.string().optional(),
  })
  .strict();

export type BlogFrontmatter = InferEntrySchema<"blog">;

export const radarSchema = z.object({
  id: z.string(),
  url: z.url(),
  timestamp: z.coerce.date(),
  context: z.string(),
  tags: z.array(z.string()),
  og: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    image: z.url().optional(),
  }),
});

export type RadarEntry = InferEntrySchema<"radar">;
