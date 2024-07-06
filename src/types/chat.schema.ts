import { z } from "zod";

export const SenderMessageSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  image: z.string().url(),
});

export const ReceiverMessageSchema = SenderMessageSchema;

export const UserChatSchema = SenderMessageSchema.extend({
  phone: z.string(),
  last_seen: z.string(),
});

export const SellerChatSchema = UserChatSchema;

export const ChatSchema = z.object({
  chat_id: z.string(),
  id: z.number().int(),
  name: z.string(),
  price: z.number().positive(),
  image: z.string().url(),
  currency: z.string(),
  status: z.string(),
  created_at: z.string(),
  last_message: z.string(),
  last_seen: z.number().int(),
  total_unseen: z.number().int(),
  user: UserChatSchema,
  seller: SellerChatSchema,
});

export const MessageSchema = z.object({
  id: z.number().int(),
  sender_id: SenderMessageSchema,
  receiver_id: ReceiverMessageSchema,
  type: z.string().optional(),
  message: z.string(),
  image: z.string().url(),
  created_at: z.string(),
  updated_at: z.string().optional(),
});

export const MessageCreateSchema = z.object({
  message: z.string().min(1, { message: "Пусто | Empty | Бош" }),
  chat_id: z.string(),
});

export type zSenderMessage = z.infer<typeof SenderMessageSchema>;
export type zReceiverMessage = z.infer<typeof ReceiverMessageSchema>;
export type zUserChat = z.infer<typeof UserChatSchema>;
export type zSellerChat = z.infer<typeof SellerChatSchema>;
export type zChat = z.infer<typeof ChatSchema>;
export type zMessage = z.infer<typeof MessageSchema>;
export type zMessageCreate = z.infer<typeof MessageCreateSchema>;
