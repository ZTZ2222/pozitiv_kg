"use server";

import { redirect } from "@/lib/i18nNavigation";
import {
  GalleryImageSchema,
  PromotionChangeStatusSchema,
  zPromotionRead,
} from "@/types/ad.schema";
import { ComplainFormSchema, zCityRead } from "@/types/other.schema";
import { getLocale } from "next-intl/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { actionClient } from "./safe-action";

export const getAds = async (
  params: URLSearchParams,
): Promise<zPromotionRead[]> => {
  const locale = await getLocale();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products?${params.toString()}`,
    {
      cache: "force-cache", // "no-store"
      headers: {
        "Accept-Language": locale,
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
  const locale = await getLocale();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`,
    {
      cache: "force-cache", // "no-store"
      headers: {
        "Accept-Language": locale,
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
  const locale = await getLocale();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products/related/${id}`,
    {
      cache: "force-cache", // "no-store"
      headers: {
        "Accept-Language": locale,
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

type AdStatus = "active" | "pending" | "inactive";

export const getMyAds = async (
  status: AdStatus,
): Promise<zPromotionRead[] | undefined> => {
  const access_token = cookies().get("access_token")?.value;
  const locale = await getLocale();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products/my-list?status=${status}`,
    {
      cache: "force-cache", // "no-store"
      credentials: "include",
      headers: {
        "Accept-Language": locale,
        Authorization: `Bearer ${access_token}`,
      },
      next: { tags: ["my-list"] },
    },
  );
  if (res.ok) {
    const { data } = await res.json();
    return data.items;
  } else if (res.status === 401) {
    redirect("/login");
  } else {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
};

export const createPromotion = async (
  data: FormData,
): Promise<string | undefined> => {
  const access_token = cookies().get("access_token")?.value;

  const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/products/add`;

  const res = await fetch(endpoint, {
    method: "POST",
    credentials: "include",
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    body: data,
  });

  if (res.ok) {
    revalidatePath("/profile");

    const { message } = await res.json();

    return message;
  } else if (res.status === 401) {
    redirect("/login");
  } else {
    throw new Error(`HTTP error! status: ${res.status} - ${await res.json()}`);
  }
};

export const deletePromotion = async (
  promotionId: number,
): Promise<string | undefined> => {
  const access_token = cookies().get("access_token")?.value;

  const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/products/delete/${promotionId}`;

  const res = await fetch(endpoint, {
    method: "DELETE",
    credentials: "include",
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  if (res.ok) {
    revalidatePath("/profile");
    redirect("/profile");

    const { message } = await res.json();

    return message;
  } else if (res.status === 401) {
    redirect("/login");
  } else {
    throw new Error(`HTTP error! status: ${res.status} - ${await res.json()}`);
  }
};

export const updatePromotion = async (
  data: FormData,
): Promise<string | undefined> => {
  const promotion_id = data.get("id");
  data.delete("id");

  const access_token = cookies().get("access_token")?.value;

  const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/products/update/${promotion_id}`;

  const res = await fetch(endpoint, {
    method: "POST",
    credentials: "include",
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    body: data,
  });

  if (res.ok) {
    revalidatePath("/profile");

    const { message } = await res.json();

    return message;
  } else if (res.status === 401) {
    redirect("/login");
  } else {
    throw new Error(`HTTP error! status: ${res.status} - ${await res.json()}`);
  }
};

export const reportPromotion = actionClient
  .schema(ComplainFormSchema)
  .action(
    async ({ parsedInput: { reportText } }): Promise<string | undefined> => {
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

      if (res.ok) {
        const { message } = await res.json();

        return message;
      } else if (res.status === 401) {
        redirect("/login");
      } else {
        throw new Error(
          `HTTP error! status: ${res.status} - ${await res.json()}`,
        );
      }
    },
  );

export const changePromotionStatus = actionClient
  .schema(PromotionChangeStatusSchema)
  .action(
    async ({
      parsedInput: { promotion_id, status },
    }): Promise<string | undefined> => {
      const access_token = cookies().get("access_token")?.value;

      const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/products/change-status/${promotion_id}`;

      const res = await fetch(endpoint, {
        method: "POST",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      if (res.ok) {
        revalidateTag("my-list");
        revalidateTag(`ad-${promotion_id}`);

        revalidatePath("/profile");

        const { message } = await res.json();

        return message;
      } else if (res.status === 401) {
        redirect("/login");
      } else {
        throw new Error(
          `HTTP error! status: ${res.status} - ${await res.json()}`,
        );
      }
    },
  );

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
      redirect("/login");
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
      cache: "force-cache", // "no-store"
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
