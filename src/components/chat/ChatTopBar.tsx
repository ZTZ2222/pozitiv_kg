"use client";

import React from "react";
import { zChat } from "@/types/chat.schema";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Phone } from "lucide-react";
import {
  cn,
  formatTimeDistanceCustom,
  getInitials,
  getRandomColor,
} from "@/lib/utils";
import { useRouter } from "@/lib/i18nNavigation";
import { useTranslations } from "next-intl";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { zUserRead } from "@/types/user.schema";
import ChatDotsDropdownMenu from "@/components/navigation/ChatDotsDropdownMenu";

type Props = {
  chat: zChat;
  currentUser: zUserRead;
  className?: string;
};

const ChatTopBar: React.FC<Props> = ({ chat, currentUser, className }) => {
  const t = useTranslations("ChatPage");
  const router = useRouter();

  // Determine the other user in the chat
  const otherUser =
    chat.seller?.id === currentUser?.id ? chat.user : chat.seller;

  return (
    <>
      <div
        className={cn(
          "container flex h-16 items-center justify-between border-b border-gray-200 md:justify-start md:gap-5",
          className,
        )}
      >
        <Button
          className="flex h-fit w-fit shrink-0 justify-start p-1 lg:hidden"
          variant="ghost"
          size="icon"
          onClick={() => router.back()}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>

        <div className="flex items-center justify-end gap-0.5">
          <Avatar className="mr-2.5 size-[30px] lg:size-[50px]">
            <AvatarImage src={otherUser.image} className="object-cover" />
            <AvatarFallback
              className={cn("text-sm font-medium lg:text-xl", getRandomColor())}
            >
              {getInitials(otherUser.name)}
            </AvatarFallback>
          </Avatar>
          <div className="max-w-[140px] text-left xs:max-w-[185px] sm:max-w-[250px]">
            <h1 className="truncate text-lg font-semibold lg:text-nowrap">
              {otherUser.name}
            </h1>
            <p className="truncate text-sm font-light leading-tight text-gray-500">
              {t("last-seen-1")}{" "}
              {formatTimeDistanceCustom(new Date(otherUser.last_seen))}{" "}
              {t("last-seen-2")}
            </p>
          </div>
        </div>

        <Button variant="ghost" size="icon" className="p-0 md:hidden">
          <Phone className="h-6 w-6 text-fuchsia-500" />
        </Button>

        <ChatDotsDropdownMenu className="md:ml-auto" />
      </div>
      <Link
        href={`/ads/${chat.id}`}
        className="container flex items-center gap-2.5 border-b border-gray-200 py-1.5"
      >
        <div className="relative size-8 shrink-0 md:size-14 lg:size-8">
          <Image
            src={chat.image || "/assets/other/placeholder.svg"}
            alt={chat.name}
            fill
            className="object-cover"
          />
        </div>
        <p className="line-clamp-1 max-w-fit text-sm text-gray-500 md:line-clamp-2 lg:line-clamp-1 lg:max-w-[380px]">
          {chat.name}
        </p>
        <ChevronRight className="size-6 shrink-0 text-gray-500" />
      </Link>
    </>
  );
};

export default ChatTopBar;
