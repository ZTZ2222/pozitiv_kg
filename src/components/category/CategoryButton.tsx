"use client";

import React from "react";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { zCategoryRead } from "@/types/category.schema";
import { useRouter } from "@/lib/i18nNavigation";

const CategoryButton: React.FC<zCategoryRead> = ({
  id,
  name,
  image,
  icon,
  bg_color,
  text_color,
}) => {
  const router = useRouter();
  return (
    <Button
      className="h-fit w-[224px] justify-start gap-5 rounded-[5px] border border-yellow-400 bg-indigo-400 p-5 px-5 py-2.5 text-white"
      onClick={() => router.push(`/categories/${id}`)}
      style={{
        backgroundColor: bg_color,
        color: text_color,
      }}
    >
      {icon && (
        <Image
          src={image || "/assets/categoryIcons/service.png"}
          alt={name}
          width={50}
          height={50}
        />
      )}
      <span className="line-clamp-2 text-wrap text-start text-base font-medium">
        {name}
      </span>
    </Button>
  );
};

export default CategoryButton;
