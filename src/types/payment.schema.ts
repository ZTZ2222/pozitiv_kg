import { z } from "zod";

export const PaymentMethodReadSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  branch_name: z.string(),
  account_number: z.string(),
  account_name: z.string(),
  created_at: z.string(),
});

export const InvoiceCreateSchema = z.object({
  product_id: z.number().int(),
  days: z.number().int(),
  payment_method: z.string(),
  bank_id: z.coerce.number().int(),
  bank_slip: z.custom<File>(),
});

export type zPaymentMethodRead = z.infer<typeof PaymentMethodReadSchema>;
export type zInvoiceCreate = z.infer<typeof InvoiceCreateSchema>;
