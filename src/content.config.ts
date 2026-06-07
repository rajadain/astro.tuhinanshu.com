import { defineCollection } from "astro:content";
import { file, glob } from "astro/loaders";
import { blogSchema, radarSchema } from "./content/_schemas";

const blog = defineCollection({
  loader: glob({ base: "src/content/blog", pattern: "**/*.{md,mdx}" }),
  schema: blogSchema,
});

const radar = defineCollection({
  loader: file("src/content/radar/links.yaml"),
  schema: radarSchema,
});

export const collections = { blog, radar };
