"use client";

import { zMessage } from "@/types/chat.schema";
import { zUserRead } from "@/types/user.schema";
import { cn, getInitials } from "@/lib/utils";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { AnimatePresence, motion } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";
import BottomScroller from "@/components/BottomScroller";

interface ChatProps {
  messages: zMessage[];
  currentUser?: zUserRead;
}

export function ChatMessages({ messages, currentUser }: ChatProps) {
  return (
    <AnimatePresence>
      <ScrollArea className="h-[59vh] md:h-[56vh] lg:h-[50vh]">
        {messages.map((message, index) => (
          <motion.div
            key={index}
            layout
            initial={{ opacity: 0, scale: 1, y: 50, x: 0 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 1, y: 1, x: 0 }}
            transition={{
              opacity: { duration: 0.1 },
              layout: {
                type: "spring",
                bounce: 0.3,
                duration: messages.indexOf(message) * 0.05 + 0.2,
              },
            }}
            style={{
              originX: 0.5,
              originY: 0.5,
            }}
            className={cn(
              "flex flex-col gap-2 whitespace-pre-wrap p-3",
              message.sender_id.id === currentUser?.id
                ? "items-end"
                : "items-start",
            )}
          >
            <div className="flex items-center gap-2">
              {message.sender_id.id !== currentUser?.id && (
                <Avatar className="flex items-center justify-center">
                  <AvatarImage
                    src={message.sender_id.image}
                    alt={message.sender_id.name}
                    width={6}
                    height={6}
                    className="object-cover"
                  />
                  <AvatarFallback
                    className={cn("font-medium", "bg-indigo-200")}
                  >
                    {getInitials(message.sender_id.name)}
                  </AvatarFallback>
                </Avatar>
              )}
              <span
                className={cn(
                  "max-w-xs overflow-hidden rounded-md px-[18px] pb-1.5 pt-3 font-light",
                  "bg-gray-100",
                  message.sender_id.id === currentUser?.id
                    ? "rounded-[16px] rounded-br-none"
                    : "rounded-[16px] rounded-tl-none",
                )}
              >
                {message.message}
                <p className={cn("mt-1 text-xs", "text-gray-500")}>
                  {format(new Date(message.created_at), "HH:mm")}
                </p>
              </span>
              {message.sender_id.id === currentUser?.id && (
                <Avatar className="flex justify-center">
                  <AvatarImage
                    src={message.sender_id.image}
                    alt={message.sender_id.name}
                    width={6}
                    height={6}
                    className="object-cover"
                  />
                  <AvatarFallback
                    className={cn("font-medium", "bg-indigo-200")}
                  >
                    {getInitials(message.sender_id.name)}
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          </motion.div>
        ))}
        <BottomScroller dependencies={messages} />
      </ScrollArea>
    </AnimatePresence>
  );
}
