import { z } from "zod";

export const repositorySchema = z.object({
  id: z.number(),
  full_name: z.string(),
  owner: z.object({
    id: z.number(),
    avatar_url: z.string(),
    type: z.string(),
  }),
  description: z.string(),
  contributors_url: z.string(),
  stargazers_count: z.number(),
  language: z.string(),
});

export type Repository = z.infer<typeof repositorySchema>;
