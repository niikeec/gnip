import { z } from "zod";

export const repositorySchema = z.object({
  id: z.number(),
  full_name: z.string(),
  owner: z.object({
    id: z.number(),
    avatar_url: z.string(),
    type: z.string(),
  }),
  description: z.string().nullable(),
  contributors_url: z.string(),
  stargazers_count: z.number(),
  language: z.string().nullable(),
});

export type Repository = z.infer<typeof repositorySchema>;
