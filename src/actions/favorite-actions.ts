"use server";

import { FavoriteItemSchema, zPromotionRead } from "@/types/ad.schema";
import { actionClient } from "./safe-action";
import { cookies } from "next/headers";
import { revalidatePath, revalidateTag } from "next/cache";
import {
  SearchCreateSchema,
  SearchDeleteSchema,
  zSearchRead,
} from "@/types/other.schema";
import { redirect } from "@/lib/i18nNavigation";
import { getLocale } from "next-intl/server";

export const getFavorites = async (): Promise<zPromotionRead[] | undefined> => {
  const access_token = cookies().get("access_token")?.value;
  const locale = await getLocale();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products/fevourites?sort_by=latest`,
    {
      cache: "force-cache", // "no-store"
      credentials: "include",
      headers: {
        "Accept-Language": locale,
        Authorization: `Bearer ${access_token}`,
      },
      next: { tags: ["favorites"] },
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

export const getSavedSeaches = async (): Promise<zSearchRead[] | undefined> => {
  const access_token = cookies().get("access_token")?.value;
  const locale = await getLocale();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products/search-list`,
    {
      cache: "no-store",
      credentials: "include",
      headers: {
        "Accept-Language": locale,
        Authorization: `Bearer ${access_token}`,
      },
      next: { tags: ["saved-searches"] },
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

export const updateFavorites = actionClient
  .schema(FavoriteItemSchema)
  .action(
    async ({
      parsedInput: { id, favourable_type = "Product", action },
    }): Promise<string | undefined> => {
      const access_token = cookies().get("access_token")?.value;

      const endpoint =
        action === "add"
          ? `${process.env.NEXT_PUBLIC_API_URL}/favourites/store`
          : `${process.env.NEXT_PUBLIC_API_URL}/favourites/remove`;

      const res = await fetch(endpoint, {
        method: "POST",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, favourable_type }),
      });

      if (res.ok) {
        revalidatePath("/favorites");

        const { data } = await res.json();

        return data;
      } else if (res.status === 401) {
        redirect("/login");
      } else {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
    },
  );

export const saveSearch = actionClient
  .schema(SearchCreateSchema)
  .action(
    async ({
      parsedInput: { title, result, type },
    }): Promise<string | undefined> => {
      const access_token = cookies().get("access_token")?.value;

      const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/products/save-search`;

      const res = await fetch(endpoint, {
        method: "POST",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, result, type }),
      });

      if (res.ok) {
        revalidateTag("saved-searches");

        const { message } = await res.json();

        return message;
      } else if (res.status === 401) {
        redirect("/login");
      } else {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
    },
  );

export const deleteSearch = actionClient
  .schema(SearchDeleteSchema)
  .action(async ({ parsedInput: { id } }): Promise<string | undefined> => {
    const access_token = cookies().get("access_token")?.value;

    const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/products/delete-search/${id}`;

    const res = await fetch(endpoint, {
      method: "DELETE",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    if (res.ok) {
      revalidateTag("saved-searches");

      const { message } = await res.json();

      return message;
    } else if (res.status === 401) {
      redirect("/login");
    } else {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
  });
