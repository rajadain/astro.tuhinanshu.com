import { defineCollection } from "astro:content";
import { file } from "astro/loaders";
import { blogSchema, radarSchema } from "./content/_schemas";

const blog = defineCollection({
  schema: blogSchema,
});

const radar = defineCollection({
  loader: file("src/content/radar/links.yaml"),
  schema: radarSchema,
});

export const collections = { blog, radar };
