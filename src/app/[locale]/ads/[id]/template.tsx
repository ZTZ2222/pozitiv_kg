import { getUserInfo } from "@/actions/user-actions";
import React from "react";
import Navbar from "./_components/Navbar";

const PromoTemplate = async ({ children }: { children: React.ReactNode }) => {
  const currentUser = await getUserInfo();
  return (
    <>
      <Navbar currentUser={currentUser} />
      {children}
    </>
  );
};

export default PromoTemplate;
