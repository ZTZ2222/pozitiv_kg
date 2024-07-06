"use client";

import React from "react";
import { zChat } from "@/types/chat.schema";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Phone } from "lucide-react";
import { formatTimeDistanceCustom } from "@/lib/utils";
import DotsDropdownMenu from "../navigation/DotsDropdownMenu";
import { useRouter } from "@/lib/i18nNavigation";

const ChatTopBar = ({ chat }: { chat: zChat }) => {
  const { seller } = chat;
  const router = useRouter();
  return (
    <>
      <div className="container flex h-16 items-center justify-between border-b border-gray-200 md:justify-start md:gap-5">
        <Button
          className="flex h-fit w-fit shrink-0 justify-start p-1 lg:hidden"
          variant="ghost"
          size="icon"
          onClick={() => router.back()}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>

        <div className="flex items-center justify-end gap-0.5">
          <div className="relative mr-2.5 size-[30px] overflow-hidden rounded-full lg:size-[50px]">
            <Image
              src={seller.image}
              alt={seller.name}
              className="object-cover"
              fill
              sizes="(max-width: 600px) 100vw, 50vw"
            />
          </div>
          <div className="max-w-[140px] text-left xs:max-w-[185px] sm:max-w-[250px]">
            <h1 className="truncate text-lg font-semibold lg:text-nowrap">
              {seller.name}
            </h1>
            <p className="truncate text-sm font-light leading-tight text-gray-500">
              Был(а) в сети{" "}
              {formatTimeDistanceCustom(new Date(seller.last_seen))} назад
            </p>
          </div>
        </div>

        <Button variant="ghost" size="icon" className="p-0 md:hidden">
          <Phone className="h-6 w-6 text-fuchsia-500" />
        </Button>

        <DotsDropdownMenu className="md:ml-auto" />
      </div>
      <Link
        href={`/ads/${chat.id}`}
        className="container flex items-center gap-2.5 border-b border-gray-200 py-1.5"
      >
        <div className="relative size-8 shrink-0 md:size-14 lg:size-8">
          <Image
            src={chat.image || "/assets/chat/house.png"}
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
