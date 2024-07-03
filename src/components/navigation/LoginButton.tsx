"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { UserCircle } from "@/components/icons";
import { useRouter } from "@/lib/i18nNavigation";

const LoginButton = () => {
  const t = useTranslations("Button");
  const router = useRouter();
  return (
    <Button
      variant="ghost"
      className="h-fit gap-3 fill-fuchsia-500 px-2 py-1 text-base font-normal text-fuchsia-500 hover:fill-accent-foreground"
      onClick={() => router.push("/login")}
    >
      <span>{t("login")}</span>
      <UserCircle className="h-[30px] w-[30px]" />
    </Button>
  );
};

export default LoginButton;
