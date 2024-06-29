import { getAds } from "@/actions/ads-actions";
import { getCategoryById } from "@/actions/category-actions";
import AdList from "@/components/ads/AdList";
import { Eyes } from "@/components/icons";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { getLocale, getTranslations } from "next-intl/server";
import Link from "next/link";
import React from "react";

type Props = {
  params: { categoryId: string };
};

const CategoryPromotionList: React.FC<Props> = async ({
  params: { categoryId },
}) => {
  const locale = await getLocale();
  const t = await getTranslations({
    locale: locale,
    namespace: "CategoryPromotionsPage",
  });
  const category = await getCategoryById({ id: categoryId });
  const promotions = await getAds({
    sort_by: "latest",
    category_id: categoryId,
  });

  return (
    <main>
      <ScrollArea className="ml-4 mt-7">
        <div className="mr-4 flex gap-4">
          {category.childs?.map((child) => (
            <Link
              key={child.id}
              href={`/category/${child.id}`}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-[10px] border border-input bg-background px-3.5 py-2.5 transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              {child.name}
            </Link>
          ))}
        </div>
        <ScrollBar className="hidden h-1.5 md:flex" orientation="horizontal" />
      </ScrollArea>
      {promotions.length > 0 ? (
        <AdList ads={promotions} className="container mb-10" />
      ) : (
        <>
          <div className="container flex h-[50vh] flex-col items-center justify-center gap-10">
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
      )}
    </main>
  );
};

export default CategoryPromotionList;
