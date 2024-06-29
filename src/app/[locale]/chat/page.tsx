import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { zChat } from "@/types/chat.schema";
import BottomScroller from "@/components/BottomScroller";
import { getChatList } from "@/actions/chat-actions";

const ChatList = async () => {
  const chatList = await getChatList();

  return (
    <>
      <main className="mt-10 flex h-[calc(100vh-168px)] w-full flex-col gap-2.5">
        {chatList.length > 0 ? (
          chatList.map((chat: zChat) => (
            <Link href={`/chat/${chat.chat_id}`} key={chat.chat_id}>
              <Card className="container flex min-h-[78px] items-center justify-between gap-4 rounded-none border-0 border-y border-gray-200 bg-gray-50 pb-3 pt-1.5 transition-colors duration-500 hover:bg-gray-200">
                <div className="relative size-10 shrink-0">
                  <Image
                    src={chat.seller.image || "/assets/chat/woman.png"}
                    alt="profile picture"
                    className="rounded-full bg-gray-600 object-contain"
                    fill
                    sizes="(max-width: 600px) 100vw, 50vw"
                  />
                </div>
                <div className="flex w-[160px] flex-col justify-between xs:w-[215px]">
                  <span className="truncate font-semibold text-gray-800">
                    {chat.name}
                  </span>
                  <p className="truncate font-light text-gray-500">
                    {chat.last_message}
                  </p>
                </div>
                <div className="relative size-[60px] shrink-0">
                  <Image
                    src={chat.image || "/assets/chat/house.png"}
                    alt="ad picture"
                    className="rounded-[10px] bg-gray-600 object-contain"
                    fill
                    sizes="(max-width: 600px) 100vw, 50vw"
                  />
                </div>
              </Card>
            </Link>
          ))
        ) : (
          <div className="mt-[10vh] flex flex-col items-center gap-5">
            <div className="relative h-[61px] w-[64px]">
              <Image
                src="/assets/chat/empty.png"
                alt="empty"
                fill
                sizes="(max-width: 600px) 100vw, 50vw"
                className="object-contain"
              />
            </div>
            <span className="font-semibold">Нет сообщений</span>
            <p className="max-w-[311px] text-center text-gray-500">
              У Вас пока нет сообщений. <br /> Все исходящие и входящие
              сообщения будут Вас ждать тут.
            </p>
          </div>
        )}
        <BottomScroller dependencies={[chatList.length]} />
      </main>
    </>
  );
};

export default ChatList;
