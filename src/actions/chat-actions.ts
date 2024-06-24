"use server";

import { zChat, zMessage } from "@/types/chat.schema";
import { cookies } from "next/headers";

export const getChatList = async (): Promise<zChat[]> => {
  const access_token = cookies().get("access_token")?.value;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chats`, {
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
    },
  );

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  const { data } = await res.json();

  return data.items;
};

// export const sendMessage

// export const deleteMessage
