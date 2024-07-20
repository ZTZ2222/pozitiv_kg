import React from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import CategoryButton from "./CategoryButton";
import { getCategories } from "@/actions/category-actions";

const CategoriesButtonGroup = async () => {
  const categories = await getCategories();
  return (
    <>
      <ScrollArea className="ml-4 mt-10 pb-4 md:hidden">
        <div className="mr-4 flex gap-4">
          {categories.map((category) => (
            <CategoryButton key={category.id} {...category} />
          ))}
        </div>
        <ScrollBar className="hidden h-2.5 md:flex" orientation="horizontal" />
      </ScrollArea>
      <div className="container my-[100px] hidden grid-cols-3 gap-4 p-4 md:grid lg:grid-cols-4 xl:grid-cols-5">
        {categories.map((category) => (
          <CategoryButton key={category.id} {...category} />
        ))}
      </div>
    </>
  );
};

export default CategoriesButtonGroup;
