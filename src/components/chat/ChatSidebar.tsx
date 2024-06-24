"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { IChat } from "@/types/chat.schema";
import { Avatar, AvatarImage } from "../ui/avatar";

interface SidebarProps {
  chats: IChat[];
}

export function ChatSidebar({ chats }: SidebarProps) {
  return (
    <div className="group relative flex h-full flex-col gap-4 p-2 data-[collapsed=true]:p-2">
      <div className="flex items-center justify-between p-2">
        <p className="font-medium text-gray-500">Сообщения</p>
      </div>
      <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        {chats.map((chat, index) => (
          <Link
            key={index}
            href={`/chat/${chat.chat_id}`}
            className={cn(
              buttonVariants({ variant: "grey", size: "xl" }),
              "shrink dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
              "justify-start gap-4",
            )}
          >
            <Avatar className="flex items-center justify-center">
              <AvatarImage
                src={chat.seller.image}
                alt={chat.seller.name}
                width={6}
                height={6}
                className="h-10 w-10 object-cover"
              />
            </Avatar>
            <div className="flex max-w-[215px] flex-col">
              <span className="truncate font-medium">{chat.name}</span>
              {chat.last_message && (
                <span className="truncate text-xs text-zinc-300">
                  {chat.last_message}
                </span>
              )}
            </div>
          </Link>
        ))}
      </nav>
    </div>
  );
}
