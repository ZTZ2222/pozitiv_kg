import { getChatList, getMessagesByChatId } from "@/actions/chat-actions";
import { getUserInfo } from "@/actions/user-actions";
import { ChatMessages } from "@/components/chat/ChatMessages";
import ChatSidebar from "@/components/chat/ChatSidebar";
import ChatTopBar from "@/components/chat/ChatTopBar";
import Image from "next/image";
import React from "react";

interface ChatProps {
  params: {
    chatId: string;
  };
}

const Chat = async ({ params: { chatId } }: ChatProps) => {
  const userInfo = await getUserInfo();
  const chatList = await getChatList();
  const chatMessages = await getMessagesByChatId(chatId);

  const chat = chatList.find((chat) => chat.chat_id === chatId);

  return (
    <main className="lg:container lg:my-10 lg:flex lg:gap-5">
      <ChatSidebar chats={chatList} className="hidden lg:flex" />
      <div className="w-[90%] lg:rounded-[10px] lg:shadow-[0px_0px_4px_0px_#9090904D]">
        {chatMessages.length > 0 && chat ? (
          <>
            <ChatTopBar chat={chat} />
            <ChatMessages messages={chatMessages} currentUser={userInfo} />
          </>
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
            <span className="font-semibold">Нет сообщений</span>
            <p className="max-w-[311px] text-center text-gray-500">
              У Вас пока нет сообщений. <br /> Все исходящие и входящие
              сообщения будут Вас ждать тут.
            </p>
          </div>
        )}
      </div>
    </main>
  );
};

export default Chat;
