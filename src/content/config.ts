import { z, defineCollection } from 'astro:content';

/** Default fallback image */
const DEFAULT_FEATURED_IMAGE = '/images/default-featured.jpg';

/** Base schema */
const baseSchema = z.object({
  title: z.string().min(4),
  description: z.string().max(300).optional().default(''),
  summary: z.string().max(300).optional().default(''),
  pubdate: z
    .string()
    .optional()
    .refine(val => !val || !isNaN(Date.parse(val)), {
      message: 'pubdate must be a valid ISO 8601 date string',
    }),
  slug: z.string().optional(),
  author: z.string().optional().default(''),
  tags: z.array(z.string()).optional().default([]),
  featuredImage: z
    .string()
    .regex(/^(https?:\/\/|\/)/)
    .optional()
    .default(DEFAULT_FEATURED_IMAGE),
  seoTitle: z.string().max(70).optional().default(''),
  seoDescription: z.string().max(160).optional().default(''),
  featured: z.boolean().optional(),
});

/** Case studies (optional, keep only if needed) */
const caseStudySchema = baseSchema.extend({
  metrics: z.array(z.string()).optional().default([]),
});

/** Active collections only */
export const collections = {
  blog: defineCollection({ schema: baseSchema }),
  pages: defineCollection({ schema: baseSchema }),

  // Uncomment only when directories exist
  // 'case-studies': defineCollection({ schema: caseStudySchema }),
};