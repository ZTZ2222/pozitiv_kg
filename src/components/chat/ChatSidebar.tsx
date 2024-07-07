"use client";

import Link from "next/link";
import React from "react";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { zChat } from "@/types/chat.schema";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import useMediaQuery from "@/hooks/useMediaQuery";
import { useTranslations } from "next-intl";

type Props = {
  chats: zChat[];
  className?: string;
};

const ChatSidebar: React.FC<Props> = ({ chats, className }) => {
  const t = useTranslations("ChatPage");

  const isDesktop = useMediaQuery("(min-width: 1024px)");
  if (!chats.length && !isDesktop)
    return (
      <div className="mt-[calc(50vh-200px)] flex h-full flex-col items-center justify-center gap-5">
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
          {t("empty-chat-title")}
        </span>
        <p className="max-w-[311px] text-center text-gray-500">
          {t("empty-chat-description-1")} <br />
          {t("empty-chat-description-2")}
        </p>
      </div>
    );
  return (
    <div
      className={cn(
        "group relative flex h-[630px] flex-col rounded-[10px] lg:w-[382px] lg:shadow-[0px_0px_4px_0px_#9090904D] xl:w-[410px]",
        className,
      )}
    >
      <div className="hidden items-center justify-between px-7 py-[22px] lg:flex">
        <p className="font-medium text-gray-500">{t("messages")}</p>
      </div>
      <ScrollArea>
        <nav className={cn("flex flex-col gap-2.5", "mt-10 lg:mt-0")}>
          {chats.map((chat) => (
            <Link href={`/chat/${chat.chat_id}`} key={chat.chat_id}>
              <Card className="container flex min-h-[78px] items-center justify-between gap-4 rounded-none border-0 border-y border-gray-200 bg-gray-50 pb-3 pt-1.5 transition-colors duration-500 hover:bg-gray-200">
                <div className="relative size-10 shrink-0 md:size-[50px]">
                  <Image
                    src={chat.seller.image || "/assets/chat/woman.png"}
                    alt="profile picture"
                    className="rounded-full bg-gray-600 object-contain"
                    fill
                    sizes="(max-width: 600px) 100vw, 50vw"
                  />
                </div>
                <div className="flex max-w-[160px] flex-col justify-between xs:max-w-[215px] md:max-w-[480px] lg:max-w-[208px] xl:max-w-[235px]">
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
          ))}
        </nav>
      </ScrollArea>
    </div>
  );
};

export default ChatSidebar;
