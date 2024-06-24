import { z } from "zod";

export const SocialReadSchema = z.object({
  title: z.string(),
  image: z.string(),
  link: z.string(),
});

export type zSocialRead = z.infer<typeof SocialReadSchema>;
