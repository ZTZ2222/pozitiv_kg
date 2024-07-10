"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ThreeDots } from "@/components/icons";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { clearChat } from "@/actions/chat-actions";
import { useParams } from "next/navigation";
import { useAction } from "next-safe-action/hooks";

type Props = {
  className?: string;
};

const ChatDotsDropdownMenu: React.FC<Props> = ({ className }) => {
  const { chatId: chat_id } = useParams();
  const t = useTranslations("Modal");

  const { execute } = useAction(clearChat);

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn("size-fit px-2 py-1", className)}
        >
          <ThreeDots />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="-translate-x-4 translate-y-2">
        <DropdownMenuItem
          onClick={() => execute({ chat_id: chat_id as string })}
        >
          {t("clear-chat")}
        </DropdownMenuItem>
        <DropdownMenuItem>{t("block-user")}</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ChatDotsDropdownMenu;
