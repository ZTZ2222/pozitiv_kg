import React from "react";
import { Button } from "@/components/ui/button";
import { Gem, Phone } from "lucide-react";
import { cn, formatStringToDate } from "@/lib/utils";
import AddToFavorites from "@/components/favorites/AddToFavorites";
import { WhatsApp } from "@/components/icons";
import { useTranslations } from "next-intl";
import Link from "next/link";
import ChatModal from "@/components/chat/ChatModal";
import { zPromotionRead } from "@/types/ad.schema";
import { zUserRead } from "@/types/user.schema";

type Props = {
  promotion: zPromotionRead;
  currentUser?: zUserRead;
  chatId?: string;
  className?: string;
};

const ContactBlock: React.FC<Props> = ({
  promotion: {
    id,
    favorites,
    whatsapp_number,
    phone,
    created_at,
    updated_at,
    seller,
  },
  currentUser,
  chatId,
  className,
}) => {
  const t = useTranslations("ContactBlock");

  const isPromotionOwner = currentUser?.id === seller?.id;
  return (
    <div className={cn("flex flex-col gap-5", className)}>
      {!isPromotionOwner && (
        <div className="order-1 flex w-full gap-5">
          {/* Send Message */}
          <ChatModal chatId={chatId} />

          {/* Redirect to WhatsApp */}
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
      )}

      {/* Call */}
      {!isPromotionOwner && (
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
      )}

      {/* Run Advertising */}
      {isPromotionOwner && (
        <Button
          variant="contact-chat"
          className="h-fit gap-2.5 py-5 text-lg font-medium"
          asChild
        >
          <Link href={`/commercial/${id}`} prefetch>
            <Gem className="size-6" />
            {t("advertise")}
          </Link>
        </Button>
      )}

      {/* Created & Updated Dates */}
      <div className="order-3 flex flex-col lg:order-4">
        <span className="font-light text-gray-800">
          {t("updated-at")} {formatStringToDate(updated_at)}
        </span>
        <span className="font-light text-gray-800">
          {t("created-at")} {formatStringToDate(created_at)}
        </span>
      </div>
      {/* Add To Favorites */}
      {!isPromotionOwner && (
        <AddToFavorites
          variant="button"
          id={id}
          favorites={favorites}
          className="order-4 lg:order-3"
        />
      )}
    </div>
  );
};

export default ContactBlock;
