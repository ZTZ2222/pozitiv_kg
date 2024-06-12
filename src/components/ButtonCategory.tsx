import { cn } from "@/utils/Helpers";
import { Grip } from "lucide-react";
import React from "react";
import { useTranslations } from "next-intl";

interface ButtonCategoryProps {
  className?: string;
}

const ButtonCategory: React.FC<ButtonCategoryProps> = ({ className }) => {
  const t = useTranslations("Button");
  return (
    <div
      className={cn(
        "flex h-full gap-2.5 p-0 text-lg font-normal leading-tight text-gray-500",
        className,
      )}
    >
      <Grip className="h-6 w-6" />
      {t("categories")}
    </div>
  );
};

export default ButtonCategory;
