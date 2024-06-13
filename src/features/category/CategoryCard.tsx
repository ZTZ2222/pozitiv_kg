import Link from "next/link";
import React from "react";

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/utils/Helpers";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ICategory } from "@/types/category.interface";

const CategoryCard: React.FC<ICategory> = ({
  title,
  icon,
  subs,
  className,
  variant = "accordion",
}) => {
  if (variant === "button") {
    return (
      <Button
        className={cn(
          "h-fit w-[224px] justify-start gap-5 rounded-[5px] border border-yellow-400 bg-indigo-400 p-5 px-5 py-2.5 text-white",
          className,
        )}
      >
        {icon && <Image src={icon} alt={title} width={50} height={50} />}
        <span className="text-wrap text-start text-base font-medium">
          {title}
        </span>
      </Button>
    );
  }
  return (
    <AccordionItem
      value={title}
      className={cn(
        "rounded-[5px] border border-yellow-400 bg-indigo-400 text-white",
        className,
      )}
    >
      <AccordionTrigger className="p-5">
        <div className="flex items-center justify-center gap-5">
          {icon && <Image src={icon} alt={title} width={50} height={50} />}
          <span className="font-medium">{title}</span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="flex flex-col px-3">
        {subs?.map((sub) => (
          <Link
            key={sub.title}
            href={sub.href}
            className="px-2 py-2.5 hover:bg-black/25"
          >
            {sub.title}
          </Link>
        ))}
      </AccordionContent>
    </AccordionItem>
  );
};

export default CategoryCard;
