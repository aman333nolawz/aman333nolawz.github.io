import { glob } from 'astro/loaders'
import { defineCollection, z } from 'astro:content'
import { goodreadsLoader } from 'astro-loader-goodreads'

const goodreads_read_books = defineCollection({
  loader: goodreadsLoader({
    url: 'https://www.goodreads.com/review/list_rss/201671700-aman-p?shelf=read',
    refreshIntervalDays: 1,
  }),
})

const goodreads_user_updates = defineCollection({
  loader: goodreadsLoader({
    url: 'https://www.goodreads.com/user/show/201671700-aman-p',
  }),
})

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      date: z.coerce.date(),
      order: z.number().optional(),
      image: image().optional(),
      tags: z.array(z.string()).optional(),
      authors: z.array(z.string()).optional(),
      draft: z.boolean().optional(),
    }),
})

const authors = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/authors' }),
  schema: z.object({
    name: z.string(),
    pronouns: z.string().optional(),
    avatar: z.string().url().or(z.string().startsWith('/')),
    bio: z.string().optional(),
    mail: z.string().email().optional(),
    website: z.string().url().optional(),
    twitter: z.string().url().optional(),
    github: z.string().url().optional(),
    linkedin: z.string().url().optional(),
    discord: z.string().url().optional(),
  }),
})

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      description: z.string(),
      tags: z.array(z.string()),
      image: image(),
      link: z.string().url(),
      startDate: z.coerce.date().optional(),
      endDate: z.coerce.date().optional(),
    }),
})

export const collections = {
  blog,
  authors,
  projects,
  goodreads_read_books,
  goodreads_user_updates,
}
