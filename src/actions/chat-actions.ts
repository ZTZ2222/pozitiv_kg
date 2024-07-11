"use server";

import {
  ChatDeleteSchema,
  MessageCreateSchema,
  zChat,
  zMessage,
} from "@/types/chat.schema";
import { cookies } from "next/headers";
import { actionClient } from "./safe-action";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "@/lib/i18nNavigation";

export const getChatList = async (): Promise<zChat[] | undefined> => {
  const access_token = cookies().get("access_token")?.value;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chats`, {
    cache: "no-store",
    credentials: "include",
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    next: { tags: ["chats"] },
  });

  if (res.ok) {
    const { data } = await res.json();
    return data.items;
  } else if (res.status === 401) {
    redirect("/login");
  } else {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
};

export const getMessagesByChatId = async (
  chatId: string,
): Promise<zMessage[] | undefined> => {
  const access_token = cookies().get("access_token")?.value;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/chats/list/${chatId}`,
    {
      cache: "no-store",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      next: { tags: [`chat-${chatId}`] },
    },
  );

  if (res.ok) {
    const { data } = await res.json();

    return data.items.reverse();
  } else if (res.status === 401) {
    redirect("/login");
  } else {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
};

export const sendMessage = actionClient
  .schema(MessageCreateSchema)
  .action(async ({ parsedInput }) => {
    const access_token = cookies().get("access_token")?.value;

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chats/store`, {
      method: "POST",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(parsedInput),
    });

    if (res.ok) {
      revalidateTag(`chat-${parsedInput.chat_id}`);

      return await res.json();
    } else if (res.status === 401) {
      redirect("/login");
    } else {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
  });

export const clearChat = actionClient
  .schema(ChatDeleteSchema)
  .action(async ({ parsedInput: { chat_id } }): Promise<string | undefined> => {
    const access_token = cookies().get("access_token")?.value;

    const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/chats/remove-all/${chat_id}`;

    const res = await fetch(endpoint, {
      method: "DELETE",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    if (res.ok) {
      revalidatePath("/chat");
      redirect("/chat");

      const { message } = await res.json();

      return message;
    } else if (res.status === 401) {
      redirect("/login");
    } else {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
  });
