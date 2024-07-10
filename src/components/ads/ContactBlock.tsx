import React from "react";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import { cn, formatStringToDate } from "@/lib/utils";
import AddToFavorites from "@/components/favorites/AddToFavorites";
import { WhatsApp } from "@/components/icons";
import { useTranslations } from "next-intl";
import Link from "next/link";
import ChatModal from "@/components/chat/ChatModal";

type Props = {
  id: number;
  favorites: number;
  phone?: string;
  whatsapp_number?: string;
  createdAt: string;
  updatedAt: string;
  chatId: string;
  className?: string;
};

const ContactBlock: React.FC<Props> = ({
  id,
  favorites,
  phone,
  whatsapp_number,
  createdAt,
  updatedAt,
  chatId,
  className,
}) => {
  const t = useTranslations("ContactBlock");
  return (
    <div className={cn("flex flex-col gap-5", className)}>
      <div className="order-1 flex w-full gap-5">
        <ChatModal chatId={chatId} />

        <Button variant="contact-wa" size="col-2" asChild>
          <Link
            href={`https://wa.me/${whatsapp_number}`}
            target="_blank"
            className={!whatsapp_number ? "pointer-events-none" : ""}
            aria-disabled={!whatsapp_number}
            tabIndex={!whatsapp_number ? -1 : undefined}
          >
            <WhatsApp className="size-5 fill-white" />
            WhatsApp
          </Link>
        </Button>
      </div>
      <Button
        variant="contact-call"
        size="col-1"
        className="order-2 lg:hidden"
        asChild
      >
        <Link
          href={`tel:${phone}`}
          className={!phone ? "pointer-events-none" : ""}
          aria-disabled={!phone}
          tabIndex={!phone ? -1 : undefined}
        >
          <Phone className="size-5" />
          {t("call")}
        </Link>
      </Button>
      {/* Created & Updated Dates */}
      <div className="order-3 flex flex-col lg:order-4">
        <span className="font-light text-gray-800">
          {t("updated-at")} {formatStringToDate(updatedAt)}
        </span>
        <span className="font-light text-gray-800">
          {t("created-at")} {formatStringToDate(createdAt)}
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
