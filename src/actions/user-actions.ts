"use server";

import { zUserRead } from "@/types/user.schema";
import { cookies } from "next/headers";

export const getUserInfo = async (): Promise<zUserRead> => {
  const access_token = cookies().get("access_token")?.value;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/info`, {
    cache: "no-store",
    credentials: "include",
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  const { data } = await res.json();

  return data;
};
