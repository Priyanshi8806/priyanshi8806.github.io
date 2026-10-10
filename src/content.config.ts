import { defineCollection, reference } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { z } from 'astro/zod';

const links = z
  .object({
    paper: z.string().optional(),
    code: z.string().optional(),
    slides: z.string().optional(),
    data: z.string().optional(),
    poster: z.string().optional(),
    video: z.string().optional(),
  })
  .default({});

// Research projects: working papers, industry work, academic projects.
const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      short: z.string().optional(), // label used in the research map
      kind: z.enum(['paper', 'industry', 'academic']),
      status: z.enum(['idea', 'in-progress', 'working-paper', 'under-review', 'published', 'completed']),
      date: z.coerce.date(),
      authors: z.array(z.string()).default([]),
      venue: z.string().optional(),
      tldr: z.string(),
      why: z.string().optional(),
      figure: image().optional(),
      figureCaption: z.string().optional(),
      methods: z.array(z.string()).default([]),
      questions: z.array(reference('agenda')).default([]),
      explainer: reference('explainers').optional(),
      links,
      featured: z.boolean().default(false),
      draft: z.boolean().default(false),
    }),
});

// Research agenda: the questions you want to work on in a PhD.
const agenda = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/agenda' }),
  schema: z.object({
    title: z.string(),
    order: z.number(),
    short: z.string(), // label used in the research map
    summary: z.string(),
    stage: z.enum(['active', 'next', 'someday']),
    methods: z.array(z.string()).default([]),
  }),
});

// Interactive explainers (MDX, so they can embed components).
const explainers = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/explainers' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    date: z.coerce.date(),
    readingTime: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

// Lab notebook: short, dated notes on work in progress.
const notebook = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/notebook' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    kind: z.enum(['progress', 'idea', 'null-result', 'reading-note', 'method']),
    summary: z.string(),
    tags: z.array(z.string()).default([]),
    project: reference('projects').optional(),
    draft: z.boolean().default(false),
  }),
});

// Picture blog: one folder per post with index.md + images.
const photos = defineCollection({
  loader: glob({
    pattern: '**/index.md',
    base: './src/content/photos',
    generateId: ({ entry }) => entry.replace(/\/index\.md$/, ''),
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.coerce.date(),
      location: z.string().optional(),
      cover: image(),
      coverAlt: z.string(),
      images: z
        .array(z.object({ src: image(), alt: z.string(), caption: z.string().optional() }))
        .default([]),
      draft: z.boolean().default(false),
    }),
});

const news = defineCollection({
  loader: file('./src/data/news.yaml'),
  schema: z.object({
    date: z.coerce.date(),
    text: z.string(), // supports inline markdown links: [text](url)
  }),
});

const readings = defineCollection({
  loader: file('./src/data/readings.yaml'),
  schema: z.object({
    theme: z.string(),
    authors: z.string(),
    year: z.number(),
    title: z.string(),
    venue: z.string().optional(),
    url: z.string().optional(),
    note: z.string(), // why this paper shaped your thinking
  }),
});

export const collections = { projects, agenda, explainers, notebook, photos, news, readings };
