import { z } from "zod";

export const ComplainFormSchema = z.object({
  reportText: z.string().min(1),
});

export const SocialReadSchema = z.object({
  title: z.string(),
  image: z.string(),
  link: z.string(),
});

export const SearchCreateSchema = z.object({
  title: z.string(),
  result: z.string(),
  type: z.number().int(),
});

export const SearchDeleteSchema = z.object({
  id: z.number().int(),
});

export const SearchReadSchema = SearchCreateSchema.omit({
  result: true,
}).extend({
  id: z.number().int(),
  query: z.string(),
});

export const FilterFormSchema = z
  .object({
    category_id: z.coerce.string(),
    currency: z.string(),
    min_price: z.string(),
    max_price: z.string(),
    sort_by: z.string(),
  })
  .partial();

export const CityReadSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  created_at: z.string(),
});

export const CurrencyReadSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  symbol: z.string(),
  code: z.string(),
});

export type zComplainForm = z.infer<typeof ComplainFormSchema>;
export type zSocialRead = z.infer<typeof SocialReadSchema>;
export type zSearchCreate = z.infer<typeof SearchCreateSchema>;
export type zSearchDelete = z.infer<typeof SearchDeleteSchema>;
export type zSearchRead = z.infer<typeof SearchReadSchema>;
export type zFilterForm = z.infer<typeof FilterFormSchema>;
export type zCityRead = z.infer<typeof CityReadSchema>;
export type zCurrencyRead = z.infer<typeof CurrencyReadSchema>;
