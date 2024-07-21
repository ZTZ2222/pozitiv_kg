import React from "react";
import { Eyes } from "../icons";
import { getLocale, getTranslations } from "next-intl/server";
import Link from "next/link";

const EmptyMessage = async () => {
  const locale = await getLocale();
  const t = await getTranslations({
    locale: locale,
    namespace: "CategoryPromotionsPage",
  });
  return (
    <>
      <div className="container flex h-[75vh] flex-col items-center justify-center gap-10 lg:h-[65vh]">
        <div className="flex max-w-[260px] flex-col items-center gap-5 text-center">
          <Eyes />
          <h2 className="text-lg font-semibold text-gray-800">
            {t("empty-message-title")}
          </h2>
          <p className="text-gray-600">{t("empty-message-description")}</p>
        </div>
        <Link
          className="flex h-[50px] w-full max-w-[358px] items-center justify-center rounded-[10px] bg-fuchsia-500 font-medium text-white"
          href="/"
        >
          {t("back-to-home")}
        </Link>
      </div>
    </>
  );
};

export default EmptyMessage;
