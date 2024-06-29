"use server";

import { zPromotionRead } from "@/types/ad.schema";
import { getLocale } from "next-intl/server";
import { cookies } from "next/headers";

interface QueryParams {
  search?: string;
  category_id?: string;
  sort_by?: string;
  recommend?: string;
}

export const getAds = async ({
  search = "",
  category_id = "",
  sort_by = "",
  recommend = "",
}: QueryParams): Promise<zPromotionRead[]> => {
  const access_token = cookies().get("access_token")?.value;
  const locale = await getLocale();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products?search=${search}&category_id=${category_id}&sort_by=${sort_by}&recommend=${recommend}`,
    {
      cache: "no-store",
      credentials: "include",
      headers: {
        "Accept-Language": locale,
        Authorization: `Bearer ${access_token}`,
      },
      next: { tags: ["ad-list"] },
    },
  );
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const { data } = await response.json();

  return data.items;
};

export const getAdInfo = async (id: string): Promise<zPromotionRead> => {
  const access_token = cookies().get("access_token")?.value;
  const locale = await getLocale();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`,
    {
      cache: "no-store",
      credentials: "include",
      headers: {
        "Accept-Language": locale,
        Authorization: `Bearer ${access_token}`,
      },
      next: { tags: [`ad-${id}`] },
    },
  );
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const { data } = await response.json();

  return data;
};

export const getRelatedAds = async (id: string): Promise<zPromotionRead[]> => {
  const access_token = cookies().get("access_token")?.value;
  const locale = await getLocale();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products/related/${id}`,
    {
      cache: "no-store",
      credentials: "include",
      headers: {
        "Accept-Language": locale,
        Authorization: `Bearer ${access_token}`,
      },
      next: { tags: [`related-ads-for-${id}`] },
    },
  );
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const { data } = await response.json();

  if (data.items.length % 2) {
    data.items.pop();
  }

  return data.items;
};
