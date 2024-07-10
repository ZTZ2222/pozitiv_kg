"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { Share } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const ShareButton = () => {
  const t = useTranslations("Button");

  const handleShare = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        toast({
          description: t("link-copied"),
        });
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  return (
    <Button
      variant="ghost"
      size="xs"
      className="h-fit gap-1.5 text-fuchsia-500 hover:bg-inherit"
      onClick={handleShare}
    >
      {t("share")} <Share className="size-5" />
    </Button>
  );
};

export default ShareButton;
