import { isAuthenticated } from "@/actions/user-actions";
import BreadCrumbs from "@/components/navigation/BreadCrumbs";
import { redirect } from "@/lib/i18nNavigation";
import React from "react";

const LoginLayout = async ({ children }: { children: React.ReactNode }) => {
  const isAuth = await isAuthenticated();

  if (isAuth) {
    redirect("/profile");
  }
  return (
    <>
      <BreadCrumbs path={["login"]} className="container" />
      {children}
    </>
  );
};

export default LoginLayout;
