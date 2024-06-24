import { getChatList, getMessagesByChatId } from "@/actions/chat-actions";
import { getUserInfo } from "@/actions/user-actions";
import ChatLayout from "@/components/chat/ChatLayout";
import ChatTopBar from "@/components/chat/ChatTopBar";
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

  if (!chat) {
    return <div>Chat not found</div>;
  }

  return (
    <>
      <ChatTopBar chat={chat} />
      <div className="z-10 w-full max-w-5xl rounded-lg border text-sm lg:flex">
        <ChatLayout
          chatList={chatList}
          chatMessages={chatMessages}
          userInfo={userInfo}
        />
      </div>
    </>
  );
};

export default Chat;
