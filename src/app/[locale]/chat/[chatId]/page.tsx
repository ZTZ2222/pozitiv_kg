import { ChatLayout } from "@/features/chat/ChatLayout";
import ChatTopBar from "@/features/chat/ChatTopBar";
import { chat_list } from "@/utils/fake_api";
import React from "react";

interface ChatProps {
  params: {
    chatId: string;
  };
}

const Chat = async ({ params: { chatId } }: ChatProps) => {
  const chat = chat_list.find((chat) => chat.chat_id === chatId);

  if (!chat) {
    return <div>Chat not found</div>;
  }

  return (
    <>
      <ChatTopBar chat={chat} />
      <div className="z-10 w-full max-w-5xl rounded-lg border text-sm lg:flex">
        <ChatLayout />
      </div>
    </>
  );
};

export default Chat;
