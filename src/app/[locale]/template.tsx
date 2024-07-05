import BreadCrumbs from "@/components/navigation/BreadCrumbs";
import Footer from "@/components/navigation/Footer";
import Header from "@/components/navigation/Header";
import MobileNav from "@/components/navigation/MobileNav";
import { validateAccessToken } from "@/lib/auth";
import React from "react";

const Template = async ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = await validateAccessToken();
  return (
    <>
      <Header isAuthenticated={isAuthenticated} />
      <BreadCrumbs className="hidden lg:mt-48 lg:block" />
      {children}
      <Footer />
      <MobileNav />
    </>
  );
};

export default Template;
