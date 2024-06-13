"use client";

import React from "react";
import CategoryCard from "./CategoryCard";
import { categories } from "./CategoryModal";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const CategoryList = () => {
  return (
    <ScrollArea className="ml-4 mt-10">
      <div className="mr-4 flex gap-4">
        {categories.map((category) => (
          <CategoryCard
            key={category.title}
            variant="button"
            title={category.title}
            icon={category.icon}
            className={category.className}
          />
        ))}
      </div>
      <ScrollBar className="h-1.5" orientation="horizontal" />
    </ScrollArea>
  );
};

export default CategoryList;
