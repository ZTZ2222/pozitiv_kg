import { IAttribute } from "@/types/category.interface";
import * as z from "zod";

export const createDynamicSchema = (attributes: IAttribute[]) => {
  const schema: Record<string, z.ZodTypeAny> = {};

  attributes.forEach((attr) => {
    let fieldSchema: z.ZodTypeAny;
    switch (attr.type) {
      case "integer":
        fieldSchema = z.preprocess(
          (val) => (val !== "" ? Number(val) : undefined),
          z.number().int(),
        );
        break;
      case "text":
        fieldSchema = z.string();
        break;
      case "select":
        if (attr.options.length > 0) {
          fieldSchema = z.enum([
            attr.options[0].name,
            ...attr.options.slice(1).map((opt) => opt.name),
          ]);
        } else {
          fieldSchema = z.string();
        }
        break;
      case "multiselect":
        fieldSchema = z
          .array(z.string())
          .refine((value) => value.some((item) => item), {
            message: "You have to select at least one item.",
          });
        break;
      default:
        fieldSchema = z.any();
    }

    if (attr.is_required === 0) {
      fieldSchema = fieldSchema.optional();
    }

    schema[attr.name] = fieldSchema;
  });

  return z.object(schema);
};
