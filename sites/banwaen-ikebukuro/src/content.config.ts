import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    source: z.enum(['owner_line', 'retty_review', 'ai_generated']),
    author: z.string(),
    authorRole: z.string().optional(),
    pubDate: z.coerce.date(),
    emoji: z.string().optional(),
    tags: z.array(z.string()).default([]),
    demo: z.boolean().default(false),
  }),
});

export const collections = { blog };
