"use server";

import { redirect } from "@/lib/i18nNavigation";
import { cookies } from "next/headers";

export const setAccessToken = async (token?: string) => {
  cookies().set("access_token", token!);
};

export const exchangeCodeForToken = async (code: string): Promise<void> => {
  const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/auth/google/callback?code=${code}`;

  const res = await fetch(endpoint, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });

  if (res.ok) {
    const {
      data: { token },
    } = await res.json();

    await setAccessToken(token);
    // return token;
    // redirect("/");
  } else {
    throw new Error(`HTTP error! status: ${res.status} - ${await res.json()}`);
  }
};
