import { z } from "zod";

export const ComplainFormSchema = z.object({
  type: z.enum(
    [
      "spam",
      "closed",
      "prohibited",
      "dublicate",
      "wrong_category",
      "fraud",
      "other",
    ],
    {
      required_error: "Причина не выбрана.",
    },
  ),
});

export const SocialReadSchema = z.object({
  title: z.string(),
  image: z.string(),
  link: z.string(),
});

export const SearchCreateSchema = z.object({
  title: z.string(),
  query: z.string(),
  type: z.number().int(),
});

export const SearchDeleteSchema = z.object({
  id: z.number().int(),
});

export const SearchReadSchema = SearchCreateSchema.extend({
  id: z.number().int(),
});

export type zComplainForm = z.infer<typeof ComplainFormSchema>;
export type zSocialRead = z.infer<typeof SocialReadSchema>;
export type zSearchCreate = z.infer<typeof SearchCreateSchema>;
export type zSearchDelete = z.infer<typeof SearchDeleteSchema>;
export type zSearchRead = z.infer<typeof SearchReadSchema>;
