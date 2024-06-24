import { z } from "zod";

export const BannerSchema = z.object({
  id: z.number().int().positive(),
  link: z.string().url(),
  banner: z.string().url(),
});

export type zBanner = z.infer<typeof BannerSchema>;
