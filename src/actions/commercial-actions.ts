import { redirect } from "@/lib/i18nNavigation";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const createCommerialInvoice = async (
  data: FormData,
): Promise<string | undefined> => {
  const access_token = cookies().get("access_token")?.value;

  // data.forEach((value, key) => {
  //   console.log({ value, key });
  // });

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
