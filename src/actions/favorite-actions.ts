"use server";

import { FavoriteItemSchema } from "@/types/ad.schema";
import { actionClient } from "./safe-action";
import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";

export const addToFavorites = actionClient
  .schema(FavoriteItemSchema)
  .action(async ({ parsedInput: { id, favourable_type = "Product" } }) => {
    const access_token = cookies().get("access_token")?.value;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/favourites/store`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
          "Accept-Language": "ru",
        },
        body: JSON.stringify({ id, favourable_type }),
      },
    );

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const { data } = await res.json();

    return { status: "OK", message: data };
  });

export const removeFromFavorites = actionClient
  .schema(FavoriteItemSchema)
  .action(async ({ parsedInput: { id, favourable_type = "Product" } }) => {
    const access_token = cookies().get("access_token")?.value;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/favourites/remove`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
          "Accept-Language": "ru",
        },
        body: JSON.stringify({ id, favourable_type }),
      },
    );

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const { data } = await res.json();

    return { status: "OK", message: data };
  });
