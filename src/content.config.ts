import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const frameworks = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/frameworks" }),
  schema: z.object({
    title: z.string(),
    name: z.string(),
    definition: z.string(),
    slug: z.string(),
  }),
});

export const collections = { frameworks };
