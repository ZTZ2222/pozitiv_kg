import { z, ZodObject, ZodTypeAny } from "zod";
import { SellerReadSchema } from "./user.schema";
import { CategoryReadSchema, zCategoryAttribute } from "./category.schema";

// Function to extend schema with dynamic fields
export const extendSchemaWithAttributes = (
  baseSchema: ZodObject<any>,
  attributes: zCategoryAttribute[],
): ZodObject<any> => {
  const dynamicSchemaFields: Record<string, ZodTypeAny> = {};

  attributes.forEach((attr) => {
    let schemaField: ZodTypeAny;
    switch (attr.type) {
      case "integer":
        schemaField = z.coerce.number();
        break;
      case "text":
        schemaField = z.string();
        break;
      case "select":
        schemaField = z.coerce.number();
        break;
      case "multiselect":
        schemaField = z.array(z.coerce.number());
        break;
      default:
        schemaField = z.unknown();
    }
    if (attr.is_required === 0) {
      schemaField = schemaField.optional();
    }

    dynamicSchemaFields[`attribute_${attr.id}`] = schemaField;
  });

  return baseSchema.extend(dynamicSchemaFields);
};

export const GalleryImageSchema = z.object({
  id: z.number().int().optional(),
  image: z.string().url(),
});

export const PromotionAttributeSchema = z.object({
  title: z.string(),
  value: z.string(),
});

export const PromotionCreateSchema = z.object({
  name: z.string().optional(),
  description: z.string(),
  price: z.coerce.number(),
  category_id: z.number(),
  city_id: z.coerce.number(),
  galleries: z.array(z.custom<File>()),
  currency: z.string(),
  addtional_information: z.string().optional(),
  enable_phone: z.coerce.number(),
  phone: z.string().optional(),
  whatsapp_number: z.string().optional(),
});

export const PromotionUpdateSchema = PromotionCreateSchema.extend({
  id: z.number().int().positive(),
});

export const PromotionReadSchema = PromotionUpdateSchema.omit({
  category_id: true,
  city_id: true,
  galleries: true,
}).extend({
  is_valid_discount: z.boolean(),
  discount_remaining_days: z.number().int(),
  price_after_discount: z.string(),
  exchange_price: z.string(),
  exchange_price_after_discount: z.string(),
  discount_start_date: z.string(),
  discount_end_date: z.string(),
  image: z.string().optional(),
  favorites: z.number().int(),
  attribute: PromotionAttributeSchema.array().default([]),
  galleries: z.array(GalleryImageSchema),
  likes: z.number().int(),
  is_likes: z.boolean(),
  views_count: z.number().int(),
  is_vip: z.boolean(),
  vip_status: z.string().optional(),
  status: z.string(),
  owner_status: z.string(),
  chat_status: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  addtional_information: z.string().optional(),
  whatsapp_number: z.string(),
  whatsapp_country_code: z.string(),
  phone_country_code: z.string(),
  latitude: z.string(),
  longitude: z.string(),
  category: CategoryReadSchema,
  city_name: z.string(),
  seller: SellerReadSchema,
  address: z.string().optional(),
  social_link: z.string().optional(),
  enable_phone: z.number().int(),
});

export const PromotionChangeStatusSchema = z.object({
  promotion_id: z.number().int(),
  status: z.enum(["published", "pending"]),
});

export const FavoriteItemSchema = z.object({
  id: z.number().int(),
  favourable_type: z.string(),
  action: z.enum(["add", "remove"]),
});

export type zGalleryImage = z.infer<typeof GalleryImageSchema>;
export type zPromotionAttribute = z.infer<typeof PromotionAttributeSchema>;
export type zPromotionCreate = z.infer<typeof PromotionCreateSchema>;
export type zPromotionUpdate = z.infer<typeof PromotionUpdateSchema>;
export type zPromotionRead = z.infer<typeof PromotionReadSchema>;
export type zPromotionChangeStatus = z.infer<
  typeof PromotionChangeStatusSchema
>;
export type zFavoriteItem = z.infer<typeof FavoriteItemSchema>;
