"use server";

import { redirect } from "@/lib/i18nNavigation";
import { zPaymentMethodRead } from "@/types/payment.schema";
import { getLocale } from "next-intl/server";
import { cookies } from "next/headers";

export const getPaymentMethods = async (): Promise<
  zPaymentMethodRead[] | undefined
> => {
  const locale = await getLocale();

  const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/banks`;

  const res = await fetch(endpoint, {
    cache: "no-store",
    headers: {
      "Accept-Language": locale,
    },
  });

  if (res.ok) {
    const { data } = await res.json();

    return data.items;
  } else {
    throw new Error(`HTTP error! status: ${res.status} - ${await res.json()}`);
  }
};

export const createCommerialInvoice = async (
  data: FormData,
): Promise<string | undefined> => {
  const access_token = cookies().get("access_token")?.value;

  const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/products/promotion`;

  const res = await fetch(endpoint, {
    method: "POST",
    credentials: "include",
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    body: data,
  });

  if (res.ok) {
    redirect("/profile");

    const { message } = await res.json();

    return message;
  } else if (res.status === 401) {
    redirect("/login");
  } else {
    throw new Error(`HTTP error! status: ${res.status} - ${await res.json()}`);
  }
};
