import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const policies = defineCollection({
  loader: glob({ base: "./src/content/policies", pattern: "**/*.md" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    updated: z.string(),
    order: z.number(),
  }),
});

export const collections = { policies };
