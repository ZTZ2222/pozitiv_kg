import React from "react";

import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { UserCircle } from "@/components/icons";

const LoginButton = () => {
  const t = useTranslations("Button");
  return (
    <Button
      size="sm"
      className="gap-3 p-0 text-base font-normal text-fuchsia-500"
    >
      <span>{t("login")}</span>
      <UserCircle className="h-[30px] w-[30px] fill-fuchsia-500" />
    </Button>
  );
};

export default LoginButton;
