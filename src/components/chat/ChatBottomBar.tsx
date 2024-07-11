"use client";

import { SendHorizontal } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MessageCreateSchema, zMessageCreate } from "@/types/chat.schema";
import { Separator } from "@/components/ui/separator";
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
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { DialogClose } from "@/components/ui/dialog";

type Props = {
  chatId: string;
  asModal?: boolean;
  className?: string;
};

const ChatBottombar: React.FC<Props> = ({ chatId, asModal, className }) => {
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

  const { execute, isExecuting } = useAction(sendMessage);

  const onSubmit = (data: zMessageCreate) => {
    execute(data);
    form.reset();
    setTextareaHeight("40px");
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

  // Change height of textarea
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [textareaHeight, setTextareaHeight] = useState("40px");

  const emessage = form.watch("message");
  useEffect(() => {
    if (textareaRef.current) {
      setTextareaHeight(`${textareaRef.current.scrollHeight}px`);
    }
  }, [emessage]);

  if (asModal) {
    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={cn("bg-white", className)}
        >
          {/* Button group */}
          <ScrollArea className="max-w-[460px] whitespace-nowrap border-t border-gray-400">
            <div className="flex space-x-2.5 px-4 py-2.5">
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
            <ScrollBar orientation="horizontal" className="h-2" />
          </ScrollArea>

          <Separator className="mx-auto w-[90%]" />

          {/* Textarea and submit button */}
          <div className="flex w-full flex-col items-center gap-3.5 p-4">
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <>
                  <FormControl>
                    <textarea
                      placeholder={t("textarea-placeholder")}
                      onKeyDown={handleKeyPress}
                      className="h-32 w-full resize-none rounded-[10px] border px-2 py-1.5 placeholder:text-sm"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="absolute bottom-1 left-5" />
                </>
              )}
            />
            <DialogClose asChild>
              <Button
                variant="contact-call"
                size="col-2"
                type="submit"
                disabled={isExecuting}
              >
                {t("send-message")}
              </Button>
            </DialogClose>
          </div>
        </form>
      </Form>
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn(
          "fixed bottom-0 overflow-hidden bg-white lg:static",
          className,
        )}
      >
        {/* Button group */}
        <ScrollArea className="w-screen whitespace-nowrap border-t border-gray-400 lg:w-[590px] xl:w-[738px]">
          <div className="flex space-x-2.5 p-4">
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
        <div className="flex w-screen items-center gap-3.5 p-4 lg:w-full">
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <>
                <FormControl>
                  <textarea
                    placeholder={t("textarea-placeholder")}
                    onKeyDown={handleKeyPress}
                    style={{ height: textareaHeight, overflow: "hidden" }}
                    className="w-full resize-none rounded-[10px] border px-2 py-1.5 placeholder:text-sm"
                    {...field}
                    ref={textareaRef}
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
