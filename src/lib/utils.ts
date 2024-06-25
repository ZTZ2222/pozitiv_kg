import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { zCategoryAttributeRead } from "@/types/category.schema";
import { formatDistance } from "date-fns";
import { ru } from "date-fns/locale";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function chunkArray(arr: zCategoryAttributeRead[], size: number) {
  return arr.reduce<zCategoryAttributeRead[][]>((chunks, item, index) => {
    const chunkIndex = Math.floor(index / size);

    if (!chunks[chunkIndex]) {
      chunks[chunkIndex] = [];
    }

    chunks[chunkIndex].push(item);

    return chunks;
  }, []);
}

export const formatTimeDistanceCustom = (date: Date) => {
  const result = formatDistance(date, new Date(), { locale: ru });
  return result
    .replace(/часов?/g, "ч.")
    .replace(/дней?/g, "д.")
    .replace(/минут?/g, "мин.")
    .replace(/секунд?/g, "сек.");
};

// Regular expression to match /chat/{id}
export const chatRouteRegex = /\/chat\/\d+_\d+$/;

export const formatStringToDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("ru-RU");
};
