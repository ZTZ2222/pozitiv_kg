"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MessageCircleMore } from "lucide-react";
import { useTranslations } from "next-intl";
import ChatBottombar from "./ChatBottomBar";
import { useRouter } from "@/lib/i18nNavigation";

type Props = {
  chatId?: string;
};

const ChatModal: React.FC<Props> = ({ chatId }) => {
  const t = useTranslations("ContactBlock");

  const router = useRouter();

  if (!chatId) {
    return (
      <Button
        onClick={() => router.push("/login")}
        variant="contact-chat"
        size="col-2"
      >
        <MessageCircleMore className="size-5" />
        {t("chat")}
      </Button>
    );
  }
  return (
    <Dialog modal={false}>
      <DialogTrigger asChild>
        <Button variant="contact-chat" size="col-2">
          <MessageCircleMore className="size-5" />
          {t("chat")}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">
            {t("chat-modal-title")}
          </DialogTitle>
        </DialogHeader>
        <ChatBottombar
          asModal
          chatId={chatId}
          className="w-[calc(100vw-50px)] md:w-[460px]"
        />
      </DialogContent>
    </Dialog>
  );
};

export default ChatModal;
