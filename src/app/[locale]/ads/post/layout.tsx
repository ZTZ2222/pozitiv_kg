import { isAuthenticated } from "@/actions/user-actions";
import BreadCrumbs from "@/components/navigation/BreadCrumbs";
import { redirect } from "@/lib/i18nNavigation";
import React from "react";

const AdPostLayout = async ({ children }: { children: React.ReactNode }) => {
  const isAuth = await isAuthenticated();

  if (!isAuth) {
    redirect("/login");
  }
  return (
    <>
      <BreadCrumbs path={["post"]} className="container mb-[20px]" />
      {children}
    </>
  );
};

export default AdPostLayout;
