import { z } from "zod";

const OptionSchema = z.object({
  id: z.number().int(),
  name: z.string(),
});

export const CategoryAttributeReadSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  type: z.enum(["integer", "text", "select", "multiselect"]),
  is_required: z.number().int(),
  options: z.array(OptionSchema),
});

const baseCategorySchema = z.object({
  id: z.number().int(),
  name: z.string(),
  description: z.string(),
  image: z.string().url().optional(),
  icon: z.string().optional(),
  bg_color: z.string(),
  text_color: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  variant: z.enum(["accordion", "button"]).optional(),
});

export const CategoryReadSchema = baseCategorySchema.extend({
  childs: z.lazy(() => baseCategorySchema.array()).optional(),
});

export type zCategoryAttributeRead = z.infer<
  typeof CategoryAttributeReadSchema
>;
export type zCategoryRead = z.infer<typeof CategoryReadSchema>;
