import { getLocale, getTranslations } from "next-intl/server";
import React from "react";
import CategoryModal from "@/components/category/CategoryModal";
import Swiper from "@/components/Swiper";
import CategoryList from "@/components/category/CategoryList";
import Search from "@/components/navigation/Search";
import MainFilter from "@/components/filter/MainFilter";
import AdList from "@/components/ads/AdList";
import { getCategories } from "@/actions/category-actions";
import { getBanners } from "@/actions/banner-actions";

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

  return (
    <main>
      {/* Bottom header */}
      <div className="container flex items-center justify-between gap-[18px] py-1.5 shadow-sm md:hidden">
        <Search />
        <MainFilter categories={categories} />
      </div>
      {/* End of bottom header */}
      <Swiper images={banners} className="mt-[30px]" />
      <CategoryList categories={categories} />
      <div className="container flex justify-center">
        <CategoryModal
          categories={categories}
          className="mt-4 self-center md:hidden"
        />
      </div>
      <section className="container mt-[50px]">
        <h2 className="text-lg font-semibold">{t("recommended_ads")}</h2>
        <AdList />
      </section>

      <Swiper images={banners} className="mt-[50px]" />
      <section className="container mb-[100px] mt-[35px]">
        <h2 className="text-lg font-semibold">{t("recently_viewed")}</h2>
        <AdList />
      </section>
    </main>
  );
}
