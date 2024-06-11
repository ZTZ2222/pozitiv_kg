import { cn } from "@/utils/Helpers";
import { Grip } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import { useTranslations } from "next-intl";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

const ButtonCategory: React.FC<ButtonProps> = ({ className }) => {
  const t = useTranslations("Button");
  return (
    <Button
      className={cn(
        "h-full gap-2.5 p-0 text-lg font-normal leading-tight text-grey-300",
        className,
      )}
    >
      <Grip className="h-6 w-6" />
      {t("categories")}
    </Button>
  );
};

export default ButtonCategory;
