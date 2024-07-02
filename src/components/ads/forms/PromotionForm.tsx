"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PromotionCreateSchema, zPromotionCreate } from "@/types/ad.schema";
import { Button } from "@/components/ui/button";
import ImageUpload from "@/components/ui/image-upload";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zCategoryAttribute, zCategoryRead } from "@/types/category.schema";
import CategoryPicker from "@/components/ui/category-picker";
import { useEffect, useState } from "react";
import DynamicFormItem from "./DynamicFormItem";
import { getCategoryAttributes } from "@/actions/category-actions";

type Props = {
  categories: zCategoryRead[];
};

export const formSchema = z
  .object({
    name: z.string().optional(),
    description: z.string(),
    price: z.coerce.number(),
    category_id: z.number(),
    discount: z.number().min(0).max(100).default(0),
    dates: z.string().optional(),
    city_id: z.number().int().positive().optional(),
    galleries: z.array(z.instanceof(File)),
    // attribute: CategoryAttributeSchema.array().default([]),
    currency: z.enum(["USD", "KGS", "RU", "EURO"]).default("KGS"),
    phone: z.string(),
  })
  .partial();

type FormData = z.infer<typeof formSchema>;

const PromotionForm: React.FC<Props> = ({ categories }) => {
  const t = useTranslations("PromotionForm");
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currency: "KGS",
    },
  });

  const [attributes, setAttributes] = useState<zCategoryAttribute[]>([]);

  useEffect(() => {
    async function getAttrs(categoryId: number) {
      const attrs = await getCategoryAttributes(categoryId);
      setAttributes(attrs);
    }
    if (form.watch("category_id")) {
      getAttrs(form.watch("category_id")!);
    }
  }, [form.watch("category_id")]);

  const onSubmit = (data: FormData) => {
    toast({
      title: "Form submitted!",
      description: JSON.stringify(data, null, 2),
      duration: 3000,
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="container flex min-h-screen w-full flex-col gap-4 bg-gray-50 py-5"
      >
        {/* Image Upload */}
        <FormField
          control={form.control}
          name="galleries"
          render={({ field }) => <ImageUpload field={field} />}
        />

        {/* Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-medium">
                {t("description-label")}
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder={t("description-placeholder")}
                  {...field}
                  className="h-24"
                  autoComplete="off"
                />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Price */}
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-medium">
                {t("price-label")}
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder={t("price-placeholder")}
                  autoComplete="off"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Category */}
        <FormField
          control={form.control}
          name="category_id"
          render={({ field }) => (
            <CategoryPicker field={field} categories={categories} />
          )}
        />

        {/* Category Attributes */}
        {attributes.length > 0 && (
          <div className="space-y-4">
            {attributes.map((attribute) => (
              <DynamicFormItem key={attribute.id} attr={attribute} />
            ))}
          </div>
        )}

        {/* Submit */}
        <Button
          disabled={form.formState.isSubmitting}
          className="h-12 w-full bg-fuchsia-500"
          type="submit"
          size="sm"
        >
          Опубликовать
        </Button>
      </form>
    </Form>
  );
};

export default PromotionForm;
