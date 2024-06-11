import Link from "next/link";
import React from "react";

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/utils/Helpers";
import Image from "next/image";

interface CategoryCardProps {
  title: string;
  icon?: string;
  subs?: {
    title: string;
    href: string;
  }[];
  className?: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  title,
  icon,
  subs,
  className,
}) => {
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
          <Link href={sub.href} className="px-2 py-2.5 hover:bg-black/5">
            {sub.title}
          </Link>
        ))}
      </AccordionContent>
    </AccordionItem>
  );
};

export default CategoryCard;
