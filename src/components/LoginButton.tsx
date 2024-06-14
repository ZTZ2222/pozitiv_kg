import React from "react";

import { Button } from "./ui/button";
import { useTranslations } from "next-intl";

const LoginButton = () => {
  const t = useTranslations("Button");
  return (
    <Button
      size="sm"
      className="gap-3 p-0 text-base font-normal text-fuchsia-500"
    >
      <span>{t("login")}</span>
      <svg
        viewBox="0 0 30 30"
        xmlns="http://www.w3.org/2000/svg"
        className="h-[30px] w-[30px] fill-fuchsia-500"
      >
        <path d="M15 0C23.28 0 30 6.72 30 15C30 23.28 23.28 30 15 30C6.72 30 0 23.28 0 15C0 6.72 6.72 0 15 0ZM6.03498 20.1245C8.23625 23.4104 11.5427 25.5 15.2396 25.5C18.9365 25.5 22.2429 23.4104 24.4442 20.1245C22.0328 17.8758 18.7968 16.5 15.2396 16.5C11.6823 16.5 8.44643 17.8758 6.03498 20.1245ZM15 13.5C17.4854 13.5 19.5 11.4853 19.5 9C19.5 6.51473 17.4854 4.5 15 4.5C12.5147 4.5 10.5 6.51473 10.5 9C10.5 11.4853 12.5147 13.5 15 13.5Z" />
      </svg>
    </Button>
  );
};

export default LoginButton;
