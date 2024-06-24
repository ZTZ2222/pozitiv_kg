"use server";

import { zPromotionRead } from "@/types/ad.schema";
import { getLocale } from "next-intl/server";

export const getAds = async (): Promise<zPromotionRead[]> => {
  const locale = await getLocale();
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
    cache: "no-store",
    headers: {
      "Accept-Language": locale,
    },
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const { data } = await response.json();

  return data.items;
};
