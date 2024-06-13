"use client";

import React from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { Grip, X } from "lucide-react";
import CategoryCard from "./CategoryCard";
import { Accordion } from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import useMediaQuery from "@/hooks/useMediaQuery";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils/Helpers";

export const categories = [
  {
    title: "Недвижимость",
    subs: [
      {
        title: "Квартиры",
        href: "#",
      },
      {
        title: "Дома",
        href: "#",
      },
      {
        title: "Земельные участки",
        href: "#",
      },
      {
        title: "Коммерческая недвижимость",
        href: "#",
      },
    ],
    icon: "/assets/categoryIcons/house.png",
    className: "bg-[#0279CF]",
  },
  {
    title: "Транспорт",
    subs: [
      {
        title: "Легковые автомобили",
        href: "#",
      },
      {
        title: "Грузовые автомобили",
        href: "#",
      },
      {
        title: "Мотоциклы",
        href: "#",
      },
      {
        title: "Автобусы",
        href: "#",
      },
    ],
    icon: "/assets/categoryIcons/car.png",
    className: "bg-[#0DC2C2]",
  },
  {
    title: "Услуги",
    subs: [
      {
        title: "Уборка",
        href: "#",
      },
      {
        title: "Ремонт автомобилей",
        href: "#",
      },
      {
        title: "Строительство",
        href: "#",
      },
      {
        title: "Ремонт квартир",
        href: "#",
      },
    ],
    icon: "/assets/categoryIcons/service.png",
    className: "bg-[#FF5B00]",
  },
  {
    title: "Дом и сад",
    subs: [
      {
        title: "Квартиры",
        href: "#",
      },
      {
        title: "Дома",
        href: "#",
      },
      {
        title: "Земельные участки",
        href: "#",
      },
      {
        title: "Коммерческая недвижимость",
        href: "#",
      },
    ],
    icon: "/assets/categoryIcons/chair.png",
    className: "bg-[#7EED31]",
  },
  {
    title: "Техника и электроника",
    subs: [
      {
        title: "Квартиры",
        href: "#",
      },
      {
        title: "Дома",
        href: "#",
      },
      {
        title: "Земельные участки",
        href: "#",
      },
      {
        title: "Коммерческая недвижимость",
        href: "#",
      },
    ],
    icon: "/assets/categoryIcons/phone.png",
    className: "bg-[#6C6C6C]",
  },
  {
    title: "Работа",
    subs: [
      {
        title: "Квартиры",
        href: "#",
      },
      {
        title: "Дома",
        href: "#",
      },
      {
        title: "Земельные участки",
        href: "#",
      },
      {
        title: "Коммерческая недвижимость",
        href: "#",
      },
    ],
    icon: "/assets/categoryIcons/briefcase.png",
    className: "bg-[#FF5B5B]",
  },
  {
    title: "Эко продукция",
    subs: [
      {
        title: "Квартиры",
        href: "#",
      },
      {
        title: "Дома",
        href: "#",
      },
      {
        title: "Земельные участки",
        href: "#",
      },
      {
        title: "Коммерческая недвижимость",
        href: "#",
      },
    ],
    icon: "/assets/categoryIcons/eco.png",
    className: "bg-[#8BCA1E]",
  },
  {
    title: "Личный вещи",
    subs: [
      {
        title: "Квартиры",
        href: "#",
      },
      {
        title: "Дома",
        href: "#",
      },
      {
        title: "Земельные участки",
        href: "#",
      },
      {
        title: "Коммерческая недвижимость",
        href: "#",
      },
    ],
    icon: "/assets/categoryIcons/personal.png",
    className: "bg-[#E55BFF]",
  },
];

const CategoryModal = ({ className }: { className?: string }) => {
  const t = useTranslations("Button");
  const isSmallScreen = useMediaQuery("(max-width: 395px)");
  const isDesktopScreen = useMediaQuery("(min-width: 768px)");
  return (
    <Drawer direction={isSmallScreen ? "bottom" : "left"}>
      {/* Trigger button */}
      {isDesktopScreen ? (
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
              "flex h-fit w-full max-w-[360px] gap-2.5 bg-fuchsia-500 py-3 text-lg leading-tight",
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
      <DrawerContent className="h-full max-w-[395px] rounded-t-[10px] bg-white">
        <DrawerHeader className="flex justify-between py-0 pb-8">
          <div className="ml-4 flex gap-2.5 text-lg leading-tight text-gray-500">
            <Grip className="h-6 w-6" />
            {t("categories")}
          </div>
          <DrawerClose className="">
            <X className="h-6 w-6 text-gray-500" />
          </DrawerClose>
        </DrawerHeader>

        {/* Start of categories navbar */}
        <ScrollArea>
          <Accordion
            type="single"
            collapsible
            className="w-full space-y-5 px-9"
          >
            {categories.map((item) => (
              <CategoryCard key={item.title} {...item} />
            ))}
          </Accordion>
        </ScrollArea>
        {/* End of categories navbar */}
      </DrawerContent>
      {/* Drawer content */}
    </Drawer>
  );
};

export default CategoryModal;
