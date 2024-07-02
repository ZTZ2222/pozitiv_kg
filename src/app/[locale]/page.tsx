import { getLocale, getTranslations } from "next-intl/server";
import React from "react";
import CategoryModal from "@/components/category/CategoryModal";
import Swiper from "@/components/Swiper";
import CategoryList from "@/components/category/CategoryList";
import AdList from "@/components/ads/AdList";
import { getCategories } from "@/actions/category-actions";
import { getBanners } from "@/actions/banner-actions";
import { getAds } from "@/actions/ads-actions";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export async function generateMetadata() {
  const locale = await getLocale();
  const t = await getTranslations({
    locale: locale,
    namespace: "Index",
  });

  return {
    title: t("meta_title"),
    description: t("meta_description"),
  };
}

export default async function Home() {
  const locale = await getLocale();
  const t = await getTranslations({
    locale: locale,
    namespace: "Index",
  });

  const categories = await getCategories();
  const banners = await getBanners();
  const params = new URLSearchParams({ sort_by: "latest" });
  const newPromotions = await getAds(params);
  params.set("recommend", "1");
  const recommendedPromotions = await getAds(params);

  return (
    <main>
      {/* End of bottom header */}
      <Swiper images={banners} className="mt-[30px]" />
      <CategoryList categories={categories} />
      <CategoryModal
        categories={categories}
        className="container mt-4 self-center md:hidden"
      />
      <Tabs defaultValue="recommend" className="container mb-[100px] mt-[30px]">
        <TabsList className="grid w-full grid-cols-2 bg-gray-200 p-0">
          <TabsTrigger value="recommend">{t("recommend")}</TabsTrigger>
          <TabsTrigger value="new">{t("new")}</TabsTrigger>
        </TabsList>
        <TabsContent value="recommend">
          <AdList ads={recommendedPromotions} />
        </TabsContent>
        <TabsContent value="new">
          <AdList ads={newPromotions} />
        </TabsContent>
      </Tabs>
    </main>
  );
}
