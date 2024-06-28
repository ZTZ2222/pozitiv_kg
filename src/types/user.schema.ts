import { z } from "zod";

export const UserReadSchema = z.object({
  id: z.number().int(),
  role: z.string(),
  customer_id: z.string(),
  name: z.string().optional(),
  email: z.string().email(),
  email_verified_at: z.string(),
  phone: z.string().optional(),
  phone_verified_at: z.string(),
  image: z.string().url().optional(),
  banner_img: z.string().url(),
  country: z.string().optional(),
  country_code: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  address: z.string().optional(),
  status: z.number().int(),
  about: z.string().optional(),
  registered: z.number().int(),
  register_from: z.string(),
  promo_link: z.string().url().optional(),
  promo_qr: z.string().url().optional(),
  screenshot: z.number().int(),
  show_theme: z.number().int(),
});

export const UserUpdateSchema = z.object({
  name: z.string().optional(),
  email: z.string().email(),
  phone: z.string().optional(),
});

export const SellerReadSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  image: z.string().url(),
  banner_img: z.string().url(),
});

export type zUserRead = z.infer<typeof UserReadSchema>;
export type zUserUpdate = z.infer<typeof UserUpdateSchema>;
export type zSellerRead = z.infer<typeof SellerReadSchema>;
