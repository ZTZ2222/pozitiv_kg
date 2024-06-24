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
import React, { useState } from "react";
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

const MainFilter = ({ categories }: { categories: zCategoryRead[] }) => {
  const t = useTranslations("Button");
  const isSmallScreen = useMediaQuery("(max-width: 390px)");

  const router = useRouter();

  // State to manage filter values
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currency, setCurrency] = useState("KGS");
  const [priceFrom, setPriceFrom] = useState("");
  const [priceTo, setPriceTo] = useState("");
  const [sortOrder, setSortOrder] = useState("popular");

  // Handle Apply Filter button click
  const handleApplyFilter = () => {
    const query = {
      category: selectedCategory,
      currency,
      priceFrom,
      priceTo,
      sort: sortOrder,
    };

    router.push(`?${new URLSearchParams(query).toString()}`);
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

        {/* Start of filter toolbar */}
        <div className="flex w-full flex-col gap-5 px-8">
          <div className="text-lg font-medium">Категория</div>
          <Select>
            <SelectTrigger className="rounded-[10px] border-gray-300 font-light text-gray-500">
              <SelectValue placeholder="Недвижимость" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectGroup>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id.toString()}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          {/* Price Input */}
          <div className="flex items-center gap-4 text-lg font-medium">
            <span>Цена</span>
            <Select defaultValue="KGS">
              <SelectTrigger className="w-fit rounded-[10px] border-0 p-0 font-medium text-gray-500">
                <SelectValue placeholder="🇰🇬 KGS" />
              </SelectTrigger>
              <SelectContent className="min-w-[85px] bg-white">
                <SelectGroup className="font-medium text-gray-500">
                  <SelectItem value="KGS">🇰🇬 KGS</SelectItem>
                  <SelectItem value="RUB">🇷🇺 RUB</SelectItem>
                  <SelectItem value="USD">🇺🇸 USD</SelectItem>
                  <SelectItem value="UZS">🇺🇿 UZS</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-4 text-gray-500">
            <Input
              type="number"
              placeholder="От"
              className="rounded-[10px] border-gray-300"
            />
            <Input
              type="number"
              placeholder="До"
              className="rounded-[10px] border-gray-300"
            />
          </div>
          {/* End of Price Input */}

          {/* Sort Radio Group */}
          <div className="text-lg font-medium">Сортировать по</div>
          <RadioGroup defaultValue="popular">
            <div className="flex items-center space-x-2.5">
              <RadioGroupItem value="popular" id="popular" />
              <Label htmlFor="popular">Популярности</Label>
            </div>
            <div className="flex items-center space-x-2.5">
              <RadioGroupItem value="new" id="new" />
              <Label htmlFor="new">Новинке</Label>
            </div>
            <div className="flex items-center space-x-2.5">
              <RadioGroupItem value="price-asc" id="price-asc" />
              <Label htmlFor="price-asc">Цена по возрастанию</Label>
            </div>
            <div className="flex items-center space-x-2.5">
              <RadioGroupItem value="price-desc" id="price-desc" />
              <Label htmlFor="price-desc">Цена по убыванию</Label>
            </div>
          </RadioGroup>
          {/* End of Sort Radio Group */}

          <DrawerClose asChild>
            <Button
              className="mt-8 w-full rounded-[10px] bg-cyan-400 text-white"
              size="lg"
              onClick={handleApplyFilter}
            >
              Применить фильтр
            </Button>
          </DrawerClose>
        </div>
        {/* End of filter toolbar */}
      </DrawerContent>
      {/* Drawer content */}
    </Drawer>
  );
};

export default MainFilter;
