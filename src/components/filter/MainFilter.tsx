"use client";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";
import useMediaQuery from "@/hooks/useMediaQuery";
import { SlidersHorizontal, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useTranslations } from "next-intl";
import { zCategoryRead } from "@/types/category.schema";
import { useRouter } from "@/lib/i18nNavigation";
import { getCategories } from "@/actions/category-actions";
import CategoryPicker from "@/components/ui/category-picker";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FilterFormSchema, zFilterForm } from "@/types/other.schema";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useSearchParams } from "next/navigation";
import { filterParams } from "@/lib/utils";

const MainFilter = () => {
  const t = useTranslations("FilterSortModal");
  const isSmallScreen = useMediaQuery("(max-width: 390px)");
  const [categories, setCategories] = useState<zCategoryRead[]>();

  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get("search");

  const filterForm = useForm<zFilterForm>({
    resolver: zodResolver(FilterFormSchema),
    defaultValues: {
      // currency: "KGS",
      sort_by: "latest",
    },
  });

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategories();
      setCategories(data);
    };
    fetchCategories();
  }, []);

  // Handle Apply Filter button click
  const onSubmit = (data: zFilterForm) => {
    const filteredData = filterParams(data);

    if (search) {
      filteredData.search = search;
    }

    const params = new URLSearchParams(filteredData);

    router.push(`/search?${params.toString()}`);
  };

  return (
    <Drawer direction={isSmallScreen ? "bottom" : "left"}>
      {/* Trigger button */}
      <DrawerTrigger asChild>
        <Button
          variant="ghost"
          className="h-full gap-1.5 p-1 font-light text-cyan-400"
        >
          <SlidersHorizontal className="h-6 w-6" />
          {t("filter")}
        </Button>
      </DrawerTrigger>
      {/* Trigger button */}

      {/* Drawer content */}
      <DrawerContent className="h-full max-w-[395px] rounded-t-[10px] bg-white">
        <DrawerHeader className="flex justify-between py-0 pb-8">
          <div className="ml-4 flex gap-1.5 rounded-[5px] bg-cyan-400 px-3 py-1.5 text-white">
            <SlidersHorizontal className="h-6 w-6" />
            {t("filter")}
          </div>
          <DrawerClose>
            <X className="h-6 w-6 text-gray-500" />
          </DrawerClose>
        </DrawerHeader>

        {/* Start of filter form toolbar */}
        <Form {...filterForm}>
          <form
            onSubmit={filterForm.handleSubmit(onSubmit)}
            className="z-[55] flex w-full flex-col gap-5 px-8"
          >
            {/* Category Pick */}
            <div className="text-lg font-medium">
              {t("select-category-label")}
            </div>
            <FormField
              control={filterForm.control}
              name="category_id"
              render={({ field }) => (
                <CategoryPicker
                  categories={categories}
                  field={field}
                  modal={true}
                  withLabel={false}
                />
              )}
            />

            {/* Price Input */}
            <div className="flex items-center gap-4 text-lg font-medium">
              <span>{t("price-label")}</span>
              <FormField
                control={filterForm.control}
                name="currency"
                render={({ field }) => (
                  <FormItem>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger className="w-fit rounded-[10px] border-0 p-0 font-medium text-gray-500">
                          <SelectValue placeholder="🇰🇬 KGS" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="min-w-[85px] bg-white">
                        <SelectGroup className="font-medium text-gray-500">
                          <SelectItem value="KGS">🇰🇬 KGS</SelectItem>
                          <SelectItem value="RUB">🇷🇺 RUB</SelectItem>
                          <SelectItem value="USD">🇺🇸 USD</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>
            <div className="flex gap-4 text-gray-500">
              <FormField
                control={filterForm.control}
                name="min_price"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder={t("price-placeholder-min")}
                        className="rounded-[10px] border-gray-300"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={filterForm.control}
                name="max_price"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder={t("price-placeholder-max")}
                        className="rounded-[10px] border-gray-300"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            {/* End of Price Input */}

            {/* Sort Radio Group */}
            <div className="text-lg font-medium">{t("sort-radio-label")}</div>
            <FormField
              control={filterForm.control}
              name="sort_by"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <div className="flex items-center space-x-2.5">
                        <FormControl>
                          <RadioGroupItem value="popular" id="popular" />
                        </FormControl>
                        <Label htmlFor="popular">{t("sort-var-popular")}</Label>
                      </div>
                      <div className="flex items-center space-x-2.5">
                        <FormControl>
                          <RadioGroupItem value="latest" id="latest" />
                        </FormControl>
                        <Label htmlFor="latest">{t("sort-var-new")}</Label>
                      </div>
                      <div className="flex items-center space-x-2.5">
                        <FormControl>
                          <RadioGroupItem value="price-asc" id="price-asc" />
                        </FormControl>
                        <Label htmlFor="price-asc">
                          {t("sort-var-price-asc")}
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2.5">
                        <FormControl>
                          <RadioGroupItem value="price-desc" id="price-desc" />
                        </FormControl>
                        <Label htmlFor="price-desc">
                          {t("sort-var-price-desc")}
                        </Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />

            {/* End of Sort Radio Group */}

            <DrawerClose asChild>
              <Button
                className="mt-8 w-full bg-cyan-400 text-white"
                size="lg"
                type="submit"
              >
                {t("apply-filter")}
              </Button>
            </DrawerClose>
          </form>
        </Form>
        {/* End of filter toolbar */}
      </DrawerContent>
      {/* Drawer content */}
    </Drawer>
  );
};

export default MainFilter;
