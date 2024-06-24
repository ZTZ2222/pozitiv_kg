import { ICategory } from "@/types/category.schema";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Image from "next/image";

const RecursiveAccordionItem = ({
  category,
  level = 0,
}: {
  category: ICategory;
  level?: number;
}) => {
  const { name, bg_color, text_color, icon, childs = [] } = category;

  const conditionalStyles =
    level === 0 ? { backgroundColor: bg_color, color: text_color } : {};
  return (
    <AccordionItem
      value={name}
      className={cn(
        "rounded-[5px]",
        level === 0 ? `border border-yellow-400` : "border-none",
      )}
      style={conditionalStyles}
    >
      <AccordionTrigger
        className={cn(
          "p-5",
          // `bg-[${bg_color}] text-[${text_color}]`,
        )}
      >
        <div className="flex items-center justify-center gap-5">
          {icon && level === 0 && (
            <Image src={icon} alt={name} width={50} height={50} />
          )}
          <span className="text-left font-medium">{name}</span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="flex flex-col px-3">
        {childs.length > 0 ? (
          childs.map((sub) => (
            <RecursiveAccordionItem
              key={sub.id}
              category={sub}
              level={level + 1}
            />
          ))
        ) : (
          <Link
            href={`/categories/${category.id}`}
            className="px-2 py-2.5 hover:bg-black/25"
          >
            {name}
          </Link>
        )}
      </AccordionContent>
    </AccordionItem>
  );
};

const CategoryAccordion = ({
  categories,
  className,
}: {
  categories: ICategory[];
  className?: string;
}) => {
  return (
    <Accordion type="multiple" className={className}>
      {categories.map((category) => (
        <RecursiveAccordionItem
          key={category.id}
          category={category}
          level={0}
        />
      ))}
    </Accordion>
  );
};

export default CategoryAccordion;
