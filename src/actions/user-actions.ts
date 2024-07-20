"use server";

import { UserUpdateSchema, zUserRead } from "@/types/user.schema";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { actionClient } from "./safe-action";
import { redirect } from "@/lib/i18nNavigation";

export const getUserInfo = async (): Promise<zUserRead | undefined> => {
  const access_token = cookies().get("access_token")?.value;
  const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/users/info`;
  const options: RequestInit = {
    cache: "no-store",
    credentials: "include",
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  };

  try {
    const response = await fetch(endpoint, options);
    if (!response.ok) {
      return undefined;
    }
    const { data } = await response.json();
    return data;
  } catch (error) {
    throw new Error(`An error occurred. Error: ${error}`);
  }
};

export const updateUserImage = async (
  formData: FormData,
): Promise<string | undefined> => {
  const access_token = cookies().get("access_token")?.value;

  const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/users/image-upload`;

  const res = await fetch(endpoint, {
    method: "POST",
    credentials: "include",
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    body: formData,
  });

  if (res.ok) {
    revalidatePath("/profile");

    const { data } = await res.json();

    return data;
  } else if (res.status === 401) {
    throw new Error("Unauthorized");
  } else {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
};

export const updateUserInfo = actionClient
  .schema(UserUpdateSchema)
  .action(async ({ parsedInput }): Promise<string | undefined> => {
    const access_token = cookies().get("access_token")?.value;

    const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/users/update`;

    const res = await fetch(endpoint, {
      method: "POST",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(parsedInput),
    });

    if (res.ok) {
      revalidatePath("/profile/edit");

      const { data } = await res.json();

      return data;
    } else if (res.status === 401) {
      throw new Error("Unauthorized");
    } else {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
  });

export const userLogout = async (): Promise<void> => {
  cookies().delete("access_token");
  redirect("/login");
};

export const deleteMyAccount = async (): Promise<void> => {
  const access_token = cookies().get("access_token")?.value;

  const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/users/delete`;

  const res = await fetch(endpoint, {
    method: "POST",
    credentials: "include",
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  if (res.ok) {
    cookies().delete("access_token");
    redirect("/login");
  } else if (res.status === 401) {
    throw new Error("Unauthorized");
  } else {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
};

export const isAuthenticated = async (): Promise<boolean> => {
  const access_token = cookies().get("access_token")?.value;
  const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/users/info`;
  const options: RequestInit = {
    credentials: "include",
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  };
  try {
    const response = await fetch(endpoint, options);
    if (!response.ok) {
      return false;
    }
    const { data } = await response.json();
    return Boolean(data?.id);
  } catch (error) {
    throw new Error(`An error occurred. Error: ${error}`);
  }
};
