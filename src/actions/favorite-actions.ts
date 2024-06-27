"use server";

import { FavoriteItemSchema } from "@/types/ad.schema";
import { actionClient } from "./safe-action";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export const updateFavorites = actionClient
  .schema(FavoriteItemSchema)
  .action(
    async ({
      parsedInput: { id, favourable_type = "Product", action },
    }): Promise<string> => {
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

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      revalidatePath("/favorites");

      const { data } = await res.json();

      return data;
    },
  );
