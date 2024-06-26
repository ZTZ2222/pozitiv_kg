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

export type zComplainForm = z.infer<typeof ComplainFormSchema>;
