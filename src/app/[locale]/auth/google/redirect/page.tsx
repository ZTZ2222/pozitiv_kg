import { exchangeCodeForToken } from "@/actions/auth-actions";
import React from "react";

type Props = {
  searchParams: { code: string };
};

const GoogleRedirectPage = async ({ searchParams }: Props) => {
  let errorMessage = "";
  try {
    // await exchangeCodeForToken(searchParams.code);
  } catch (error: any) {
    errorMessage = error.message;
  }
  return (
    <div className="h-screen text-2xl font-medium">
      Выполняется авторизация...
      <p className="text-red-500">Это может занять некоторое время</p>
      <div>{searchParams.code}</div>
      <div>Error Message: {errorMessage}</div>
    </div>
  );
};

export default GoogleRedirectPage;
