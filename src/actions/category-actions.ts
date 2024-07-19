"use server";

import { zCategoryAttribute, zCategoryRead } from "@/types/category.schema";
import { getLocale } from "next-intl/server";
import { fetchData } from "./safe-action";

export const getCategories = async (): Promise<zCategoryRead[]> => {
  const locale = await getLocale();
  const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/products/categories`;
  const options: RequestInit = {
    headers: {
      "Accept-Language": locale,
    },
    // revalidate: every 12 hours
    next: { revalidate: 60 * 60 * 12 },
  };
  const { data } = await fetchData(endpoint, options);
  return data.items;
};

export const getCategoryById = async ({
  id,
}: {
  id: string;
}): Promise<zCategoryRead> => {
  const locale = await getLocale();
  const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/products/categories/${id}`;
  const options: RequestInit = {
    headers: {
      "Accept-Language": locale,
    },
    // revalidate: every 12 hours
    next: { revalidate: 60 * 60 * 12 },
  };

  const { data } = await fetchData(endpoint, options);

  return data;
};

export const getCategoryAttributes = async (
  category_id: number,
): Promise<zCategoryAttribute[]> => {
  const locale = await getLocale();
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products/attributes/${category_id}`,
    {
      cache: "no-store",
      headers: {
        "Accept-Language": locale,
      },
    },
  );

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  const { data } = await res.json();

  return data;
};
