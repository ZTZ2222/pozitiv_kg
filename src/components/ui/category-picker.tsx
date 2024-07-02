"use client";

import { Check, ChevronDown, ChevronRight, ChevronsUpDown } from "lucide-react";

import { cn, flattenCategories } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  // CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ControllerRenderProps } from "react-hook-form";
import { zCategoryRead } from "@/types/category.schema";
import { useTranslations } from "next-intl";
import React, { useState } from "react";

type Props = {
  categories?: zCategoryRead[];
  field: ControllerRenderProps<any, string>;
  modal?: boolean;
  withLabel?: boolean;
};

const CategoryPicker: React.FC<Props> = ({
  categories,
  field,
  modal = false,
  withLabel = true,
}) => {
  const [open, setOpen] = React.useState(false);
  const t = useTranslations("PromotionForm");

  const flattenedCategories = flattenCategories(categories);

  const selectedCategory = flattenedCategories.find(
    (category) => category.id === field.value,
  );

  const handlePickCategory = (category_id: number) => {
    field.onChange(category_id);
    setOpen(false);
  };
  return (
    <FormItem className="flex flex-col">
      {withLabel && (
        <FormLabel className="text-lg font-medium">
          {t("category-label")}
        </FormLabel>
      )}
      <Popover open={open} onOpenChange={setOpen} modal={modal}>
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              variant="outline"
              role="combobox"
              className={cn(
                "justify-between",
                !field.value && "text-muted-foreground",
              )}
            >
              {selectedCategory ? selectedCategory.name : t("category-button")}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="max-w-[360px] p-0">
          <Command>
            {/* <CommandInput placeholder={t("category-search-placeholder")} /> */}
            <CommandList>
              <CommandEmpty>{t("category-empty-text")}</CommandEmpty>
              <CommandGroup>
                {categories?.map((category) => (
                  <RecursiveCommandItem
                    key={category.id}
                    category={category}
                    handlePickCategory={handlePickCategory}
                    field={field}
                    level={0}
                  />
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </FormItem>
  );
};

const RecursiveCommandItem = ({
  category,
  handlePickCategory,
  field,
  level,
}: {
  category: zCategoryRead;
  handlePickCategory: (category_id: number) => void;
  field: ControllerRenderProps<any, string>;
  level: number;
}) => {
  const [expanded, setExpanded] = useState(false);
  const toggleExpand = () => setExpanded(!expanded);
  return (
    <div>
      <CommandItem
        value={category.name}
        onSelect={() => handlePickCategory(category.id)}
        className="flex items-center"
        style={{ paddingLeft: `${level * 1.5}rem` }}
      >
        {category.childs && category.childs.length > 0 && (
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              toggleExpand();
            }}
            className="mr-2"
          >
            {expanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </Button>
        )}
        <Check
          className={cn(
            "mr-2 h-4 w-4",
            category.id === field.value ? "opacity-100" : "opacity-0",
          )}
        />
        {category.name}
      </CommandItem>
      {expanded && category.childs && category.childs.length > 0 && (
        <div>
          {category.childs.map((child) => (
            <RecursiveCommandItem
              key={child.id}
              category={child}
              handlePickCategory={handlePickCategory}
              field={field}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryPicker;
