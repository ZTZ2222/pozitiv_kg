"use server";

import { zBannerRead } from "@/types/banner.schema";

export const getBanners = async (): Promise<zBannerRead[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/banners`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  const { data } = await res.json();

  return data.items;
};
