import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { AppConfig } from "./AppConfig";
import { IAttribute } from "@/types/category.interface";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getI18nPath = (url: string, locale: string) => {
  if (locale === AppConfig.defaultLocale) {
    return url;
  }

  return `/${locale}${url}`;
};

export function chunkArray(arr: IAttribute[], size: number) {
  return arr.reduce<IAttribute[][]>((chunks, item, index) => {
    const chunkIndex = Math.floor(index / size);

    if (!chunks[chunkIndex]) {
      chunks[chunkIndex] = [];
    }

    chunks[chunkIndex].push(item);

    return chunks;
  }, []);
}
