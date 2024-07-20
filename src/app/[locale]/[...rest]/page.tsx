"use client";

import Crescent from "@/components/icons/Crescent";
import BreadCrumbs from "@/components/navigation/BreadCrumbs";
import { Button } from "@/components/ui/button";
import { useRouter } from "@/lib/i18nNavigation";
import { ChevronLeft } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";

const CatchAllSegments = () => {
  const t = useTranslations("NotFoundPage");
  const router = useRouter();
  return (
    <>
      <BreadCrumbs path={["404"]} className="container" />
      <div className="container mt-[30px] flex items-center lg:hidden">
        <Button
          className="flex h-fit shrink-0 justify-start p-1"
          variant="ghost"
          size="icon"
          onClick={() => router.back()}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <span className="font-light text-gray-400">404</span>
      </div>
      <div className="container flex h-[50vh] flex-col items-center justify-center gap-10">
        <div className="flex max-w-[260px] flex-col items-center gap-5 text-center">
          <Crescent />
          <h2 className="text-lg font-semibold text-gray-800">{t("title")}</h2>
          <p className="text-gray-600">{t("description")}</p>
        </div>
        <button
          className="flex h-[50px] w-full max-w-[358px] items-center justify-center rounded-[10px] bg-fuchsia-500 font-medium text-white"
          onClick={() => router.back()}
        >
          {t("back-to-home")}
        </button>
      </div>
    </>
  );
};

export default CatchAllSegments;
