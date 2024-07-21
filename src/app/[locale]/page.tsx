import { getLocale, getTranslations } from "next-intl/server";
import React, { Suspense } from "react";
import CategoryModal from "@/components/category/CategoryModal";
import Swiper from "@/components/Swiper";
import CategoriesButtonGroup from "@/components/category/CategoriesButtonGroup";
import AdList from "@/components/ads/AdList";
import { getAds } from "@/actions/ads-actions";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SkCategoriesButtonGroup from "@/components/skeletons/SkCategoriesButtonGroup";

export default async function Home() {
  const locale = await getLocale();
  const t = await getTranslations({
    locale: locale,
    namespace: "Index",
  });

  const params = new URLSearchParams({ sort_by: "latest" });
  const newPromotions = await getAds(params.toString());
  params.set("recommend", "1");
  const recommendedPromotions = await getAds(params.toString());

  return (
    <main>
      <div className="hidden h-0 lg:mt-48 lg:block" />
      {/* End of bottom header */}
      <Swiper className="mt-[30px]" />
      <Suspense fallback={<SkCategoriesButtonGroup />}>
        <CategoriesButtonGroup />
      </Suspense>
      <CategoryModal
        variant="mobile"
        className="container mt-4 self-center md:hidden"
      />
      <Tabs defaultValue="recommend" className="container mb-[100px] mt-[30px]">
        <TabsList className="grid w-full grid-cols-2 bg-gray-200 p-0 md:w-[50%] lg:w-[40%] xl:w-[33%]">
          <TabsTrigger value="recommend" className="">
            {t("recommend")}
          </TabsTrigger>
          <TabsTrigger value="new">{t("new")}</TabsTrigger>
        </TabsList>
        <TabsContent value="recommend">
          <AdList
            initialAds={recommendedPromotions}
            params={new URLSearchParams({
              recommend: "1",
              sort_by: "latest",
            }).toString()}
          />
        </TabsContent>
        <TabsContent value="new">
          <AdList
            initialAds={newPromotions}
            params={new URLSearchParams({ sort_by: "latest" }).toString()}
          />
        </TabsContent>
      </Tabs>
    </main>
  );
}
