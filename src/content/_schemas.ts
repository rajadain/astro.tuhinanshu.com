import { z } from "astro:content";

export const blogSchema = z
  .object({
    author: z.string().optional(),
    date_published: z.date(),
    date_updated: z.date().optional(),
    title: z.string(),
    postSlug: z.string().optional(),
    featured: z.boolean().optional(),
    draft: z.boolean().optional(),
    tags: z.array(z.string()).default(["others"]),
    ogImage: z.string().optional(),
    description: z.string().optional(),
  })
  .strict();

export type BlogFrontmatter = z.infer<typeof blogSchema>;

export const radarSchema = z.object({
  id: z.string(),
  url: z.string().url(),
  timestamp: z.coerce.date(),
  context: z.string(),
  tags: z.array(z.string()),
  og: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    image: z.string().url().optional(),
  }),
});

export type RadarEntry = z.infer<typeof radarSchema>;
