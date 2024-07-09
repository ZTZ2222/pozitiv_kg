"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import ImageUpload from "@/components/ui/image-upload";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zCategoryAttribute, zCategoryRead } from "@/types/category.schema";
import CategoryPicker from "@/components/ui/category-picker";
import { useEffect, useState } from "react";
import DynamicFormItem from "./DynamicFormItem";
import { getCategoryAttributes } from "@/actions/category-actions";
import { zCityRead } from "@/types/other.schema";
import { Checkbox } from "@/components/ui/checkbox";
import { createPromotion } from "@/actions/ads-actions";
import { useRouter } from "@/lib/i18nNavigation";

type Props = {
  categories: zCategoryRead[];
  cities: zCityRead[];
};

const PromotionForm: React.FC<Props> = ({ categories, cities }) => {
  const t = useTranslations("PromotionForm");
  const router = useRouter();
  const [attributes, setAttributes] = useState<zCategoryAttribute[]>([]);

  const form = useForm<any>({
    defaultValues: {
      currency: "KGS",
      enable_phone: true,
    },
  });

  useEffect(() => {
    async function getAttrs(categoryId: number) {
      const attrs = await getCategoryAttributes(categoryId);
      setAttributes(attrs);
    }

    if (form.watch("category_id")) {
      getAttrs(form.watch("category_id")!);
    }
  }, [form.watch("category_id")]);

  const onSubmit = async (data: any) => {
    console.log(data);

    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      let value = data[key];

      if (value === undefined || value === null) {
        return;
      }

      if (key === "enable_phone") {
        value = value ? 1 : 0;
      }

      // Check if the key starts with "attribute_"
      if (key.startsWith("attribute_")) {
        const id = key.split("_")[1]; // Extract the ID from the key

        // Check if the value is an array
        if (Array.isArray(value)) {
          // Iterate over each element in the array
          value.forEach((element) => {
            // Append each element with its index as part of the key
            formData.append(`attribute[${id}[]`, element);
          });
        } else {
          // If it's not an array, append the key-value pair directly
          formData.append(`attribute[${id}]`, value);
        }
      } else if (key === "galleries") {
        if (value instanceof FileList) {
          Array.from(value).forEach((file: File) => {
            formData.append("galleries[]", file);
          });
        } else {
          value.forEach((file: File) => {
            formData.append("galleries[]", file);
          });
        }
      } else {
        // For other keys (like "name", "description"), append them as is
        formData.append(key, value);
      }
    });

    await createPromotion(formData);

    router.push("/profile");
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mb-5 mt-5 flex min-h-screen w-full max-w-screen-sm flex-col gap-4 bg-gray-50 px-3 py-5 lg:mb-[100px] lg:mt-10 lg:gap-[30px]"
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
                  required
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
            <FormItem className="relative">
              <FormLabel className="text-lg font-medium">
                {t("price-label")}
              </FormLabel>

              <FormControl>
                <Input
                  placeholder={t("price-placeholder")}
                  autoComplete="off"
                  {...field}
                  value={field.value || ""}
                  required
                />
              </FormControl>

              {/* Currency */}
              <FormField
                control={form.control}
                name="currency"
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="absolute -top-3 left-14 w-fit rounded-[10px] border-0 bg-transparent p-0 font-medium text-gray-500 focus:ring-0">
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="min-w-[85px] bg-white">
                      <SelectGroup className="font-medium text-gray-500">
                        <SelectItem value="KGS">🇰🇬 KGS</SelectItem>
                        <SelectItem value="USD">🇺🇸 USD</SelectItem>
                        <SelectItem value="RU">🇷🇺 RU</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
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

        {/* City */}
        <FormField
          control={form.control}
          name="city_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-medium">
                {t("city-label")}
              </FormLabel>
              <Select onValueChange={field.onChange} required>
                <FormControl>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder={t("city-placeholder")} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {cities.map((city) => (
                    <SelectItem key={city.id} value={city.id.toString()}>
                      {city.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        {/* addtional_information */}
        <FormField
          control={form.control}
          name="addtional_information"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-medium">
                {t("additional-info-label")}
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder={t("additional-info-placeholder")}
                  {...field}
                  className="h-24"
                  autoComplete="off"
                />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Enable Phone Checkbox */}
        <FormField
          control={form.control}
          name="enable_phone"
          render={({ field }) => (
            <FormItem className="space-x-2.5 space-y-0">
              <FormControl>
                <Checkbox
                  defaultChecked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel className="text-lg font-medium">
                {t("checkbox-enable-phone-label")}
              </FormLabel>
            </FormItem>
          )}
        />

        {/* Phone */}
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold">
                {t("phone-label")}
              </FormLabel>
              <FormControl>
                <Input
                  type="tel"
                  placeholder={t("phone-placeholder")}
                  {...field}
                  value={field.value || ""}
                />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Whatsapp */}
        <FormField
          control={form.control}
          name="whatsapp_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold">
                {t("whatsapp-label")}
              </FormLabel>
              <FormControl>
                <Input
                  type="tel"
                  placeholder={t("whatsapp-placeholder")}
                  {...field}
                  value={field.value || ""}
                />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Submit */}
        <Button className="h-12 w-full bg-fuchsia-500" type="submit" size="sm">
          {t("submit-button")}
        </Button>
      </form>
    </Form>
  );
};

export default PromotionForm;
