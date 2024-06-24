"use client";

import React from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ICategory } from "@/types/category.schema";
import CategoryButton from "./CategoryButton";

const CategoryList = ({ categories }: { categories: ICategory[] }) => {
  return (
    <ScrollArea className="ml-4 mt-10">
      <div className="mr-4 flex gap-4">
        {categories.map((category) => (
          <CategoryButton key={category.id} {...category} />
        ))}
      </div>
      <ScrollBar className="hidden h-1.5 md:flex" orientation="horizontal" />
    </ScrollArea>
  );
};

export default CategoryList;
