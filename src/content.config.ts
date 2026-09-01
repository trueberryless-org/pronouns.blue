import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const policies = defineCollection({
  loader: glob({ base: "./src/content/policies", pattern: "**/*.md" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    intro: z.string().optional(),
    updated: z.string(),
    order: z.number(),
    showLogo: z.boolean().optional(),
    showUpdated: z.boolean().optional(),
    projectLogo: z.boolean().optional(),
  }),
});

export const collections = { policies };
