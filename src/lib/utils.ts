import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { zCategoryAttribute, zCategoryRead } from "@/types/category.schema";
import { formatDistance } from "date-fns";
import { ru } from "date-fns/locale";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function chunkArray(arr: zCategoryAttribute[], size: number) {
  return arr.reduce<zCategoryAttribute[][]>((chunks, item, index) => {
    const chunkIndex = Math.floor(index / size);

    if (!chunks[chunkIndex]) {
      chunks[chunkIndex] = [];
    }

    chunks[chunkIndex].push(item);

    return chunks;
  }, []);
}

export const formatTimeDistanceCustom = (date: Date) =>
  formatDistance(date, new Date(), { locale: ru });

export const formatStringToDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("ru-RU");
};

export const getInitials = (name: string): string => {
  const nameParts = name.split(" ");
  const initials = nameParts
    .map((part) => part.charAt(0))
    .join("")
    .slice(0, 2);
  return initials.toUpperCase();
};

export const checkRoute = (pathname: string, routes: (string | RegExp)[]) => {
  return routes.some((route) => {
    if (typeof route === "string") {
      return pathname === route;
    } else if (route instanceof RegExp) {
      return route.test(pathname);
    }
    return false;
  });
};

export const flattenCategories = (categories: zCategoryRead[] | undefined) => {
  const flatCategories: zCategoryRead[] = [];

  const traverse = (category: zCategoryRead) => {
    flatCategories.push(category);
    if (category.childs && category.childs.length > 0) {
      category?.childs.forEach(traverse);
    }
  };

  categories?.forEach(traverse);
  return flatCategories;
};

export const filterParams = (
  params: Record<string, any>,
): Record<string, string> => {
  return Object.fromEntries(
    Object.entries(params).filter(([_, value]) => value !== undefined),
  ) as Record<string, string>;
};

export const getFirstKWords = (text: string, k: number = 4) => {
  const words = text.split(" ");
  return words.length > k ? words.slice(0, k).join(" ") : words[0];
};
