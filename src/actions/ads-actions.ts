"use server";

import { zPromotionRead } from "@/types/ad.schema";
import { getLocale } from "next-intl/server";
import { cookies } from "next/headers";

export const getAds = async (): Promise<zPromotionRead[]> => {
  const access_token = cookies().get("access_token")?.value;
  const locale = await getLocale();

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
    cache: "no-store",
    credentials: "include",
    headers: {
      "Accept-Language": locale,
      Authorization: `Bearer ${access_token}`,
    },
    next: { tags: ["ad-list"] },
  });
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
