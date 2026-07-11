import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const commonFields = {
  title: z.string(),
  description: z.string(),
  publishedAt: z.coerce.date(),
  updatedAt: z.coerce.date().optional(),
  draft: z.boolean().default(false),
  featured: z.boolean().default(false),
  tags: z.array(z.string()).default([]),
};

const works = defineCollection({
  loader: glob({ base: "./src/content/works", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    ...commonFields,
    type: z.enum(["写作", "绘本", "漫画", "工具", "研究", "实验作品", "其他"]),
    status: z.enum(["进行中", "已完成", "长期维护", "已归档"]),
    year: z.number().int(),
    externalUrl: z.url().optional(),
    repositoryUrl: z.url().optional(),
  }),
});

const writing = defineCollection({
  loader: glob({ base: "./src/content/writing", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    ...commonFields,
    category: z.string(),
    series: z.string().optional(),
  }),
});

const experiments = defineCollection({
  loader: glob({ base: "./src/content/experiments", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    ...commonFields,
    status: z.enum(["进行中", "暂停", "已完成", "已归档"]),
    startedAt: z.coerce.date(),
    endedAt: z.coerce.date().optional(),
    cadence: z.string().optional(),
  }),
});

const projects = defineCollection({
  loader: glob({ base: "./src/content/projects", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    ...commonFields,
    type: z.enum(["写作", "绘本", "漫画", "工具", "研究", "实验作品", "其他"]),
    status: z.enum(["进行中", "已完成", "长期维护", "已归档"]),
    year: z.number().int(),
    externalUrl: z.url().optional(),
    repositoryUrl: z.url().optional(),
  }),
});

const collectionsArchive = defineCollection({
  loader: glob({ base: "./src/content/collections", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    ...commonFields,
    itemCount: z.number().int().nonnegative().default(0),
  }),
});

export const collections = { works, writing, experiments, projects, collectionsArchive };
