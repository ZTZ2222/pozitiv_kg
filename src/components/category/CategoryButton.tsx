"use client";

import React from "react";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { zCategoryRead } from "@/types/category.schema";
import { useRouter } from "@/lib/i18nNavigation";

const CategoryButton: React.FC<zCategoryRead> = ({
  id,
  name,
  image,
  bg_color,
  text_color,
}) => {
  const router = useRouter();
  return (
    <Button
      className="h-fit w-[224px] justify-start gap-5 rounded-[5px] border border-yellow-400 bg-indigo-400 p-5 px-5 py-2.5 text-white hover:opacity-70 md:w-full"
      onClick={() => router.push(`/category/${id}`)}
      style={{
        backgroundColor: bg_color,
        color: text_color,
      }}
    >
      {image && (
        <Image
          src={image || "/assets/categoryIcons/service.png"}
          alt={name}
          width={50}
          height={50}
        />
      )}
      <span className="line-clamp-2 text-wrap text-start text-sm font-medium md:text-base xl:text-sm">
        {name}
      </span>
    </Button>
  );
};

export default CategoryButton;
