import { z } from "zod";

export const BannerReadSchema = z.object({
  id: z.number().int().positive(),
  link: z.string().url(),
  banner: z.string().url(),
});

export type zBannerRead = z.infer<typeof BannerReadSchema>;
