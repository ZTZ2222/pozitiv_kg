"use client";

import { chat_list, chat_messages, current_user } from "@/utils/fake_api";
import React from "react";
import { Chat } from "./Chat";
import useMediaQuery from "@/hooks/useMediaQuery";
import { ChatSidebar } from "./ChatSidebar";

export function ChatLayout() {
  const [currentUser, setcurrentUser] = React.useState(current_user);
  const isMobileScreen = useMediaQuery("(max-width: 768px)");

  return (
    <div className="flex h-full items-stretch">
      {!isMobileScreen && <ChatSidebar chats={chat_list} />}
      <Chat messages={chat_messages} currentUser={currentUser} />
    </div>
  );
}
