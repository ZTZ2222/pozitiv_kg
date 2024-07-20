"use client";

import React from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { Grip, X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import CategoryAccordion from "./CategoryAccordion";

const CategoryModal = ({
  variant = "mobile",
  className,
}: {
  variant?: "mobile" | "desktop";
  className?: string;
}) => {
  const t = useTranslations("Button");
  return (
    <Drawer direction={variant === "mobile" ? "bottom" : "left"}>
      {/* Trigger button */}
      {variant === "desktop" ? (
        <DrawerTrigger asChild>
          <Button
            variant="ghost"
            className={cn(
              "flex h-fit gap-2.5 p-0 text-lg leading-tight text-fuchsia-500",
              className,
            )}
          >
            <Grip className="h-6 w-6" />
            {t("categories")}
          </Button>
        </DrawerTrigger>
      ) : (
        <DrawerTrigger asChild>
          <Button
            className={cn(
              "flex h-fit w-full max-w-[288px] gap-2.5 bg-fuchsia-500 py-3 text-lg leading-tight xs:max-w-[360px]",
              className,
            )}
          >
            <Grip className="h-6 w-6" />
            {t("categories")}
          </Button>
        </DrawerTrigger>
      )}
      {/* Trigger button */}

      {/* Drawer content */}
      <DrawerContent className="h-full max-w-[395px] rounded-t-[10px] bg-white md:rounded-none">
        <DrawerHeader className="flex justify-between py-0 pb-8">
          <DrawerTitle asChild>
            <div className="ml-4 flex gap-2.5 text-lg leading-tight text-gray-500">
              <Grip className="h-6 w-6" />
              {t("categories")}
            </div>
          </DrawerTitle>
          <DrawerDescription className="hidden"></DrawerDescription>
          <DrawerClose className="">
            <X className="h-6 w-6 text-gray-500" />
          </DrawerClose>
        </DrawerHeader>

        {/* Start of categories navbar */}
        <ScrollArea>
          <CategoryAccordion className="w-full space-y-5 px-9" />
        </ScrollArea>
        {/* End of categories navbar */}
      </DrawerContent>
      {/* Drawer content */}
    </Drawer>
  );
};

export default CategoryModal;
