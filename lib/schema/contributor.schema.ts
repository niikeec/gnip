import { z } from "zod";

export const contributorSchema = z.object({
  id: z.number(),
  login: z.string(),
  avatar_url: z.string(),
  type: z.string(),
});

export type Contributor = z.infer<typeof contributorSchema>;
