import { zCategoryRead } from "@/types/category.schema";
import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { DrawerClose } from "@/components/ui/drawer";
import { getCategories } from "@/actions/category-actions";
import Spinner from "@/components/skeletons/Spinner";

const RecursiveAccordionItem = ({
  category,
  level = 0,
}: {
  category: zCategoryRead;
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
            <div className="relative h-[50px] w-[50px]">
              <Image
                src={icon || "/assets/categoryIcons/service.png"}
                alt={name}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
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
          <DrawerClose asChild>
            <Link
              href={`/category/${category.id}`}
              className="px-2 py-2.5 hover:bg-black/25"
            >
              {name}
            </Link>
          </DrawerClose>
        )}
      </AccordionContent>
    </AccordionItem>
  );
};

const CategoryAccordion = ({ className }: { className?: string }) => {
  const [categories, setCategories] = useState<zCategoryRead[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const fetchedCategories = await getCategories();
        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <Spinner className="h-[70vh]" />;
  }

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
