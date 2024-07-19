"use server";

import {
  GalleryImageSchema,
  PromotionChangeStatusSchema,
  zPromotionRead,
} from "@/types/ad.schema";
import { ComplainFormSchema, zCityRead } from "@/types/other.schema";
import { getLocale } from "next-intl/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { actionClient, fetchData } from "./safe-action";

export const getAds = async (
  params: URLSearchParams,
): Promise<zPromotionRead[]> => {
  const locale = await getLocale();
  const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/products?${params.toString()}`;
  const options: RequestInit = {
    cache: "no-store",
    headers: {
      "Accept-Language": locale,
    },
    next: { tags: ["ad-list"] },
  };
  const { data } = await fetchData(endpoint, options);
  return data.items;
};

export const getAdInfo = async (id: string): Promise<zPromotionRead> => {
  const locale = await getLocale();
  const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`;
  const options: RequestInit = {
    cache: "no-store",
    headers: {
      "Accept-Language": locale,
    },
    next: { tags: [`ad-${id}`] },
  };
  const { data } = await fetchData(endpoint, options);
  return data;
};

type AdStatus = "active" | "pending" | "inactive";

export const getMyAds = async (
  status: AdStatus,
): Promise<zPromotionRead[] | undefined> => {
  const access_token = cookies().get("access_token")?.value;
  const locale = await getLocale();
  const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/products/my-list?status=${status}`;
  const options: RequestInit = {
    cache: "no-store",
    credentials: "include",
    headers: {
      "Accept-Language": locale,
      Authorization: `Bearer ${access_token}`,
    },
    next: { tags: ["my-list"] },
  };
  const { data } = await fetchData(endpoint, options);
  return data.items;
};

export const createPromotion = async (data: FormData): Promise<void> => {
  const access_token = cookies().get("access_token")?.value;
  const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/products/add`;
  const options: RequestInit = {
    method: "POST",
    credentials: "include",
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    body: data,
  };

  const { status_code } = await fetchData(endpoint, options);

  if (status_code === 200) {
    revalidatePath("/profile");
  }
};

export const deletePromotion = async (promotionId: number): Promise<void> => {
  const access_token = cookies().get("access_token")?.value;
  const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/products/delete/${promotionId}`;
  const options: RequestInit = {
    method: "DELETE",
    credentials: "include",
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  };

  const { status_code } = await fetchData(endpoint, options);

  if (status_code === 200) {
    revalidatePath("/profile");
  }
};

export const updatePromotion = async (data: FormData): Promise<void> => {
  const promotion_id = data.get("id");
  data.delete("id");

  const access_token = cookies().get("access_token")?.value;
  const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/products/update/${promotion_id}`;
  const options: RequestInit = {
    method: "POST",
    credentials: "include",
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    body: data,
  };

  const { status_code } = await fetchData(endpoint, options);

  if (status_code === 200) {
    revalidatePath("/profile");
  }
};

export const reportPromotion = actionClient
  .schema(ComplainFormSchema)
  .action(async ({ parsedInput: { reportText } }): Promise<void> => {
    const [description, id] = reportText.split("|");
    const report = `ID Объявления ${id}`;

    const access_token = cookies().get("access_token")?.value;
    const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/products/add-report/${id}`;
    const options: RequestInit = {
      method: "POST",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ report, description }),
    };

    const { status_code } = await fetchData(endpoint, options);

    if (status_code === 200) {
      return void 0;
    }
  });

export const changePromotionStatus = actionClient
  .schema(PromotionChangeStatusSchema)
  .action(async ({ parsedInput: { promotion_id, status } }): Promise<void> => {
    const access_token = cookies().get("access_token")?.value;
    const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/products/change-status/${promotion_id}`;
    const options: RequestInit = {
      method: "POST",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    };

    const { status_code } = await fetchData(endpoint, options);

    if (status_code === 200) {
      revalidateTag("my-list");
      revalidateTag(`ad-${promotion_id}`);
      revalidatePath("/profile");
    }
  });

export const deletePromotionImage = actionClient
  .schema(GalleryImageSchema)
  .action(async ({ parsedInput }): Promise<string | undefined> => {
    const access_token = cookies().get("access_token")?.value;

    const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/products/delete-image/${parsedInput.id}`;

    const res = await fetch(endpoint, {
      method: "DELETE",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    if (res.ok) {
      const { message } = await res.json();

      revalidatePath(`/ads/${parsedInput.id}/edit`);

      return message;
    } else if (res.status === 401) {
      throw new Error("Unauthorized");
    } else {
      throw new Error(
        `HTTP error! status: ${res.status} - ${await res.json()}`,
      );
    }
  });

export const getCities = async (): Promise<zCityRead[]> => {
  const locale = await getLocale();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/cities?perPage=40`,
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

  return data.items;
};
