"use client";

import { SendHorizontal } from "lucide-react";
import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { MessageCreateSchema, zMessageCreate } from "@/types/chat.schema";
import { Separator } from "@/components/ui/separator";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormMessage,
} from "@/components/ui/form";
import { useAction } from "next-safe-action/hooks";
import { sendMessage } from "@/actions/chat-actions";
import { useTranslations } from "next-intl";

type Props = {
  chatId: string;
  className?: string;
};

const ChatBottombar: React.FC<Props> = ({ chatId, className }) => {
  const form = useForm<zMessageCreate>({
    resolver: zodResolver(MessageCreateSchema),
    defaultValues: {
      chat_id: chatId,
      message: "",
    },
  });

  const t = useTranslations("ChatPage");
  const buttonGroupText = [
    t("how-much"),
    t("still-relevant"),
    t("interested-in-exchange"),
    t("price-negotiable"),
    t("want-to-buy"),
    t("interested"),
  ];

  const inputRef = useRef<HTMLTextAreaElement>(null);

  const { execute, isExecuting } = useAction(sendMessage);

  const onSubmit = (data: zMessageCreate) => {
    execute(data);

    form.reset();

    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      if (!isExecuting) {
        form.handleSubmit(onSubmit)();
      }
    }

    if (event.key === "Enter" && event.shiftKey) {
      event.preventDefault();
      const currentValue = form.getValues("message");
      form.setValue("message", currentValue + "\n");
    }
  };

  const handleAppendText = (text: string) => {
    const currentValue = form.getValues("message");
    form.setValue("message", currentValue + text);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("bg-white", className)}
      >
        {/* Button group */}
        <ScrollArea className="whitespace-nowrap border-t border-gray-400">
          <div className="flex w-max space-x-2.5 p-4">
            {buttonGroupText.map((text, index) => (
              <Button
                type="button"
                onClick={() => handleAppendText(text)}
                key={index}
                className="h-full bg-red-600 px-4 py-1 font-normal text-white hover:bg-red-800/70"
              >
                {text}
              </Button>
            ))}
          </div>
          <ScrollBar orientation="horizontal" className="opacity-0" />
        </ScrollArea>

        <Separator className="mx-auto w-[90%]" />

        {/* Textarea and submit button */}
        <div className="container flex w-full items-center justify-between gap-3.5 pb-7 pt-4">
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <>
                <FormControl>
                  <Textarea
                    placeholder={t("textarea-placeholder")}
                    onKeyDown={handleKeyPress}
                    autoComplete="off"
                    className="flex h-14 w-full resize-none items-center overflow-hidden rounded-[10px] border bg-background bg-gray-200"
                    {...field}
                    ref={inputRef}
                  />
                </FormControl>
                <FormMessage className="absolute bottom-1 left-5" />
              </>
            )}
          />

          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 shrink-0 bg-gray-400 hover:bg-gray-500"
            type="submit"
            disabled={isExecuting}
          >
            <SendHorizontal size={20} className="text-white" />
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ChatBottombar;
