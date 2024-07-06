import Image from "next/image";
import React from "react";
import { getChatList } from "@/actions/chat-actions";
import ChatSidebar from "@/components/chat/ChatSidebar";
import { MessagesSquare } from "lucide-react";

const ChatList = async () => {
  const chatList = await getChatList();

  return (
    <main className="lg:container lg:my-10 lg:flex lg:gap-5">
      <ChatSidebar chats={chatList} />
      <div className="hidden w-full rounded-[10px] shadow-[0px_0px_4px_0px_#9090904D] lg:block">
        <div className="flex size-full flex-col gap-2.5">
          {chatList.length > 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-5">
              <MessagesSquare className="size-[64px] text-cyan-400" />
              <span className="text-lg font-semibold lg:text-xl">
                Выберите чат, чтобы начать разговор
              </span>
              <p className="max-w-[311px] text-center text-gray-500">
                Пожалуйста, выберите один из чатов в боковой панели слева.
              </p>
            </div>
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-5">
              <div className="relative h-[61px] w-[64px]">
                <Image
                  src="/assets/chat/empty.png"
                  alt="empty"
                  fill
                  sizes="(max-width: 600px) 100vw, 50vw"
                  className="object-contain"
                />
              </div>
              <span className="text-lg font-semibold lg:text-xl">
                Нет сообщений
              </span>
              <p className="max-w-[311px] text-center text-gray-500">
                У Вас пока нет сообщений. <br /> Все исходящие и входящие
                сообщения будут Вас ждать тут.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default ChatList;
