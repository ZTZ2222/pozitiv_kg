"use server";

import { FavoriteItemSchema, zPromotionRead } from "@/types/ad.schema";
import { actionClient, fetchData } from "./safe-action";
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
  const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/products/fevourites?sort_by=latest`;
  const options: RequestInit = {
    credentials: "include",
    headers: {
      "Accept-Language": locale,
      Authorization: `Bearer ${access_token}`,
    },
    next: { tags: ["favorites"] },
  };

  try {
    const { data } = await fetchData(endpoint, options);
    return data.items;
  } catch (error) {
    redirect("/login");
  }
};

export const getSavedSeaches = async (): Promise<zSearchRead[] | undefined> => {
  const access_token = cookies().get("access_token")?.value;
  const locale = await getLocale();
  const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/products/search-list`;
  const options: RequestInit = {
    credentials: "include",
    headers: {
      "Accept-Language": locale,
      Authorization: `Bearer ${access_token}`,
    },
    next: { tags: ["saved-searches"] },
  };

  try {
    const { data } = await fetchData(endpoint, options);
    return data.items;
  } catch (error) {
    redirect("/login");
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
        revalidateTag("favorites");
        const { data } = await res.json();
        return data;
      } else if (res.status === 401) {
        throw new Error("Unauthorized");
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
        throw new Error("Unauthorized");
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
      throw new Error("Unauthorized");
    } else {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
  });
