import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const work = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/work' }),
  schema: z.object({
    title: z.string(), summary: z.string(), organization: z.string(),
    author: z.string().optional(),
    tools: z.array(z.string()), order: z.number(), featured: z.boolean().default(false),
    repository: z.url().optional(),
    report: z.url().optional(),
  }),
});
const writing = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/writing' }),
  schema: z.object({
    title: z.string().optional(), summary: z.string().optional(),
    topic: z.string().optional(), date: z.coerce.date().optional(),
  }),
});
export const collections = { work, writing };
