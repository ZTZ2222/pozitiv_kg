import { z } from "zod";
import { SellerReadSchema } from "./user.schema";
import { CategoryReadSchema } from "./category.schema";

export const GalleryImageSchema = z.object({
  id: z.number().int().optional(),
  image: z.string().url(),
});

export const PromotionAttributeSchema = z.object({
  title: z.string(),
  value: z.string(),
});

export const PromotionCreateSchema = z.object({
  name: z.string().min(2).trim(),
  description: z.string().min(2).trim(),
  price: z.number().positive(),
  category_id: z.number().int().positive(),
  discount: z.number().min(0).max(100).default(0),
  dates: z.string().optional(),
  city_id: z.number().int().positive(),
  galleries: GalleryImageSchema.array().default([]),
  attribute: PromotionAttributeSchema.array().default([]),
  currency: z.enum(["USD", "KGS", "RU", "EURO"]).default("KGS"),
  phone: z.string().min(2),
});

export const PromotionUpdateSchema = PromotionCreateSchema.extend({
  id: z.number().int().positive(),
});

export const PromotionReadSchema = PromotionUpdateSchema.omit({
  category_id: true,
  city_id: true,
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

export const FavoriteItemSchema = z.object({
  id: z.number().int(),
  favourable_type: z.string(),
});

export type zGalleryImage = z.infer<typeof GalleryImageSchema>;
export type zPromotionAttribute = z.infer<typeof PromotionAttributeSchema>;
export type zPromotionCreate = z.infer<typeof PromotionCreateSchema>;
export type zPromotionUpdate = z.infer<typeof PromotionUpdateSchema>;
export type zPromotionRead = z.infer<typeof PromotionReadSchema>;
export type zFavoriteItem = z.infer<typeof FavoriteItemSchema>;
