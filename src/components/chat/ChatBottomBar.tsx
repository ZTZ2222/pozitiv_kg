import { FileImage, Paperclip, SendHorizontal } from "lucide-react";
import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { zMessage } from "@/types/chat.schema";
import { Separator } from "@/components/ui/separator";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface ChatBottombarProps {
  sendMessage: (newMessage: zMessage) => void;
}

export const BottombarIcons = [{ icon: FileImage }, { icon: Paperclip }];

export default function ChatBottombar({ sendMessage }: ChatBottombarProps) {
  const buttonGroupText = [
    "Еще актуально?",
    "Готов купить!",
    "Заинтересован!",
    "Заинтересован!",
  ];
  const [message, setMessage] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
  };

  const handleSend = () => {
    if (message.trim()) {
      const newMessage: zMessage = {
        id: 5555,
        sender_id: {
          id: 482,
          name: "Mohamed Jalal Jalal",
          image: "/assets/chat/man.png",
        },
        receiver_id: {
          id: 471,
          name: "Раушан Бай",
          image: "https://pozitiv.kg/users/images/2023-11-01-65422edf287d1.png",
        },
        image: "",
        created_at: new Date().toISOString(),
        message: message.trim(),
      };
      sendMessage(newMessage);
      setMessage("");

      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }

    if (event.key === "Enter" && event.shiftKey) {
      event.preventDefault();
      setMessage((prev) => prev + "\n");
    }
  };

  return (
    <div
      className={cn(
        "bg-white",
        // "fixed bottom-0 left-0 right-0 z-50",
      )}
    >
      <ScrollArea className="whitespace-nowrap border-t border-gray-400">
        <div className="container flex gap-2.5 py-4">
          {buttonGroupText.map((text, index) => (
            <Button
              onClick={() => setMessage((prev) => prev + text)}
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
      <div className="container flex w-full items-center justify-between gap-3.5 pb-7 pt-4">
        <Textarea
          autoComplete="off"
          value={message}
          ref={inputRef}
          onKeyDown={handleKeyPress}
          onChange={handleInputChange}
          name="message"
          placeholder="Сообщение..."
          className="flex h-9 w-full resize-none items-center overflow-hidden rounded-[10px] border bg-background bg-gray-200"
        ></Textarea>
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 shrink-0 bg-gray-400 hover:bg-gray-500"
          onClick={handleSend}
        >
          <SendHorizontal size={20} className="text-white" />
        </Button>
      </div>
    </div>
  );
}
