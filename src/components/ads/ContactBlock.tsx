import React from "react";
import { Button } from "@/components/ui/button";
import { MessageCircleMore, Phone } from "lucide-react";
import { cn, formatStringToDate } from "@/lib/utils";
import AddToFavorites from "@/components/favorites/AddToFavorites";
import { WhatsApp } from "@/components/icons";

type Props = {
  id: number;
  favorites: number;
  createdAt: string;
  updatedAt: string;
  className?: string;
};

const ContactBlock: React.FC<Props> = ({
  id,
  favorites,
  createdAt,
  updatedAt,
  className,
}) => {
  return (
    <div className={cn("flex flex-col gap-5", className)}>
      <div className="order-1 flex w-full gap-5">
        <Button variant="contact-chat" size="col-2">
          <MessageCircleMore className="size-5" />
          Написать в чат
        </Button>
        <Button variant="contact-wa" size="col-2">
          <WhatsApp className="size-5 fill-white" />
          WhatsApp
        </Button>
      </div>
      <Button variant="contact-call" size="col-1" className="order-2 lg:hidden">
        <Phone className="size-5" />
        Позвонить
      </Button>
      {/* Created & Updated Dates */}
      <div className="order-3 flex flex-col lg:order-4">
        <span className="font-light text-gray-800">
          Обновлено {formatStringToDate(updatedAt)}
        </span>
        <span className="font-light text-gray-800">
          Дата публикации {formatStringToDate(createdAt)}
        </span>
      </div>
      {/* Add To Favorites */}
      <AddToFavorites
        variant="button"
        id={id}
        favorites={favorites}
        className="order-4 lg:order-3"
      />
    </div>
  );
};

export default ContactBlock;
