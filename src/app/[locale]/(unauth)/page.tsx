import { getTranslations } from "next-intl/server";
import React from "react";
import CategoryModal from "@/features/category/CategoryModal";
import Swiper from "@/components/Swiper";
import CategoryList from "@/features/category/CategoryList";
import RecommendedSection from "@/templates/RecommendedSection";
import { banners } from "@/utils/fake_api";
import RecentlyViewed from "@/templates/RecentlyViewed";

export async function generateMetadata(props: { params: { locale: string } }) {
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: "Index",
  });

  return {
    title: t("meta_title"),
    description: t("meta_description"),
  };
}

export default function IndexPage() {
  return (
    <main>
      <Swiper images={banners} className="mt-[30px]" />
      <CategoryList />
      <div className="container flex justify-center">
        <CategoryModal className="mt-4 self-center md:hidden" />
      </div>
      <RecommendedSection className="mt-[50px]" />
      <Swiper images={banners} className="mt-[50px]" />
      <RecentlyViewed className="mb-[100px] mt-[35px]" />
    </main>
  );
}
