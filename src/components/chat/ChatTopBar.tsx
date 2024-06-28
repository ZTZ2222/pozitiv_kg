"use client";

import React from "react";
import { zChat } from "@/types/chat.schema";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronRight, Phone } from "lucide-react";
import { formatTimeDistanceCustom } from "@/lib/utils";
import BackButton from "@/components/navigation/BackButton";
import DotsDropdownMenu from "../navigation/DotsDropdownMenu";

const ChatTopBar = ({ chat }: { chat: zChat }) => {
  const { seller } = chat;
  return (
    <>
      <div className="container flex h-16 items-center justify-between border-b border-gray-200">
        <BackButton variant="router" />

        <div className="flex items-center justify-end gap-0.5">
          <div className="relative mr-2.5 h-[30px] w-[30px] overflow-hidden rounded-full">
            <Image
              src={seller.image}
              alt={seller.name}
              className="object-cover"
              fill
              sizes="(max-width: 600px) 100vw, 50vw"
            />
          </div>
          <div className="text-left">
            <h1 className="max-w-[185px] truncate text-lg font-semibold">
              {seller.name}
            </h1>
            <p className="max-w-[185px] truncate text-sm font-light leading-tight text-gray-500">
              Был(а) в сети{" "}
              {formatTimeDistanceCustom(new Date(seller.last_seen))} назад
            </p>
          </div>
          <Button variant="ghost" size="icon" className="p-0">
            <Phone className="h-6 w-6 text-fuchsia-500" />
          </Button>
          <DotsDropdownMenu />
        </div>
      </div>
      <Link
        href={`/ads/${chat.id}`}
        className="container flex items-center gap-2.5 border-b border-gray-200 py-1.5"
      >
        <div className="relative size-8">
          <Image
            src={chat.image || "/assets/chat/house.png"}
            alt={chat.name}
            fill
            className="object-cover"
          />
        </div>
        <p className="max-w-[280px] truncate text-sm text-gray-500">
          {chat.name}
        </p>
        <ChevronRight className="text-gray-500" />
      </Link>
    </>
  );
};

export default ChatTopBar;
