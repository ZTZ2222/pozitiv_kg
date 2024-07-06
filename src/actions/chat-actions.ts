"use server";

import { MessageCreateSchema, zChat, zMessage } from "@/types/chat.schema";
import { cookies } from "next/headers";
import { actionClient } from "./safe-action";
import { revalidateTag } from "next/cache";

export const getChatList = async (): Promise<zChat[]> => {
  const access_token = cookies().get("access_token")?.value;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chats`, {
    cache: "no-store",
    credentials: "include",
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    next: { tags: ["chats"] },
  });

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  const { data } = await res.json();

  return data.items;
};

export const getMessagesByChatId = async (
  chatId: string,
): Promise<zMessage[]> => {
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

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  const { data } = await res.json();

  return data.items.reverse();
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

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    revalidateTag(`chat-${parsedInput.chat_id}`);

    return await res.json();
  });

// export const deleteMessage
