"use server";

import { zPromotionRead } from "@/types/ad.schema";
import { zCityRead } from "@/types/other.schema";
import { getLocale } from "next-intl/server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const getAds = async (
  params: URLSearchParams,
): Promise<zPromotionRead[]> => {
  const access_token = cookies().get("access_token")?.value;
  const locale = await getLocale();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products?${params.toString()}`,
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

type AdStatus = "active" | "pending" | "cancelled";

export const getMyAds = async (status: AdStatus): Promise<zPromotionRead[]> => {
  const access_token = cookies().get("access_token")?.value;
  const locale = await getLocale();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products/my-list?status=${status}`,
    {
      cache: "no-store",
      credentials: "include",
      headers: {
        "Accept-Language": locale,
        Authorization: `Bearer ${access_token}`,
      },
      next: { tags: ["my-list"] },
    },
  );
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const { data } = await response.json();

  return data.items;
};

export const createPromotion = async (data: FormData): Promise<string> => {
  const access_token = cookies().get("access_token")?.value;

  // data.forEach((value, key) => {
  //   console.log({ value, key });
  // });

  const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/products/add`;

  const res = await fetch(endpoint, {
    method: "POST",
    credentials: "include",
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    body: data,
  });

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status} - ${await res.json()}`);
    // const error = await res.json();
    // console.log(error);
  }

  revalidatePath("/profile");

  const { message } = await res.json();

  return message;
};

export const getCities = async (): Promise<zCityRead[]> => {
  const locale = await getLocale();

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cities`, {
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
