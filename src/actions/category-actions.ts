"use server";

import { zCategoryRead } from "@/types/category.schema";
import { getLocale } from "next-intl/server";

export const getCategories = async (): Promise<zCategoryRead[]> => {
  const locale = await getLocale();
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products/categories`,
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

  return data.items;
};

export const getCategoryById = async ({
  id,
}: {
  id: string;
}): Promise<zCategoryRead> => {
  const locale = await getLocale();
  const response = await fetch(
    `https://pozitiv.kg/api/v1/products/categories/${id}`,
    {
      cache: "no-store",
      headers: {
        "Accept-Language": locale,
      },
    },
  );
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const { data } = await response.json();

  return data;
};
