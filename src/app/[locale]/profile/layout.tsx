import { isAuthenticated } from "@/actions/user-actions";
import BreadCrumbs from "@/components/navigation/BreadCrumbs";
import { redirect } from "@/lib/i18nNavigation";
import React from "react";

const ProfileLayout = async ({ children }: { children: React.ReactNode }) => {
  const isAuth = await isAuthenticated();

  if (!isAuth) {
    redirect("/login");
  }
  return (
    <>
      <BreadCrumbs path={["profile"]} className="container" />
      {children}
    </>
  );
};

export default ProfileLayout;
