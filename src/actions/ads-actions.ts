"use server";

import { redirect } from "@/lib/i18nNavigation";
import { zPromotionRead } from "@/types/ad.schema";
import { ComplainFormSchema, zCityRead } from "@/types/other.schema";
import { getLocale } from "next-intl/server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { actionClient } from "./safe-action";

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

export const deletePromotion = async (promotionId: number): Promise<string> => {
  const access_token = cookies().get("access_token")?.value;

  const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/products/delete/${promotionId}`;

  const res = await fetch(endpoint, {
    method: "DELETE",
    credentials: "include",
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status} - ${await res.json()}`);
  }

  revalidatePath("/profile");
  redirect("/profile");

  const { message } = await res.json();

  return message;
};

export const reportPromotion = actionClient
  .schema(ComplainFormSchema)
  .action(async ({ parsedInput: { reportText } }): Promise<string> => {
    const [description, id] = reportText.split("|");
    const report = `ID Объявления ${id}`;

    const access_token = cookies().get("access_token")?.value;

    const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/products/add-report/${id}`;

    const res = await fetch(endpoint, {
      method: "POST",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ report, description }),
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const { message } = await res.json();

    return message;
  });

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
