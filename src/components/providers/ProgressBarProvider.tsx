"use client";

import { usePathname } from "@/lib/i18nNavigation";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

const ProgressBarProvider = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  return (
    <>
      {children}
      <ProgressBar
        height={pathname === "/login" ? "0px" : "6px"}
        color="#f1dd61"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </>
  );
};

export default ProgressBarProvider;
