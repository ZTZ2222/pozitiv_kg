"use client";

import React from "react";
import { Chat } from "./Chat";
import useMediaQuery from "@/hooks/useMediaQuery";
import { ChatSidebar } from "./ChatSidebar";
import { zChat, zMessage } from "@/types/chat.schema";
import { zUserRead } from "@/types/user.schema";

type Props = {
  chatList: zChat[];
  chatMessages: zMessage[];
  userInfo: zUserRead;
};

const ChatLayout: React.FC<Props> = ({ chatList, chatMessages, userInfo }) => {
  const isMobileScreen = useMediaQuery("(max-width: 768px)");

  return (
    <div className="flex h-full items-stretch">
      {!isMobileScreen && <ChatSidebar chats={chatList} />}
      <Chat messages={chatMessages} currentUser={userInfo} />
    </div>
  );
};

export default ChatLayout;
