"use server";

import { zBannerRead } from "@/types/banner.schema";
import { fetchData } from "./safe-action";

export const getBanners = async (): Promise<zBannerRead[]> => {
  const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/banners`;
  const options: RequestInit = {
    method: "GET",
    // revalidate: every 12 hours
    next: { revalidate: 60 * 60 * 12 },
  };
  const { data } = await fetchData(endpoint, options);

  return data.items;
};
