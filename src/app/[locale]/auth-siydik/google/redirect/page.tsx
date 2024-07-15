import { exchangeCodeForToken } from "@/actions/auth-actions";
import React from "react";

type Props = {
  searchParams: { code: string };
};

const GoogleRedirectPage = async ({ searchParams }: Props) => {
  await exchangeCodeForToken(searchParams.code);
  return (
    <div className="h-screen text-2xl font-medium">
      Выполняется авторизация...
    </div>
  );
};

export default GoogleRedirectPage;
