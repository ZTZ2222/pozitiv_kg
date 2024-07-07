import { getAds } from "@/actions/ads-actions";
import { getBanners } from "@/actions/banner-actions";
import AdList from "@/components/ads/AdList";
import EmptyMessage from "@/components/category/EmptyMessage";
import SaveSearch from "@/components/favorites/SaveSearch";
import Swiper from "@/components/Swiper";
import React from "react";
import { getSavedSeaches } from "../favorites/page";
import { getLocale, getTranslations } from "next-intl/server";

type Props = {
  searchParams?: {
    search?: string;
    category_id?: string;
    currency?: string;
    min_price?: string;
    max_price?: string;
    sort_by?: string;
  };
};

const SearchPage: React.FC<Props> = async ({ searchParams }) => {
  const locale = await getLocale();
  const t = await getTranslations({
    locale: locale,
    namespace: "Search",
  });

  const params = new URLSearchParams(searchParams);
  const promotions = await getAds(params);
  const banners = await getBanners();
  const searchList = await getSavedSeaches();

  return (
    <main className="relative">
      {promotions.length > 0 ? (
        <>
          <h1 className="container my-5 text-xl font-medium text-gray-500 lg:text-2xl">
            {t("search-result")}
          </h1>
          <AdList ads={promotions} className="container mb-10 lg:mb-32" />
          <Swiper images={banners} className="mb-10 lg:mb-32" />
        </>
      ) : (
        <EmptyMessage />
      )}
      <SaveSearch
        searchList={searchList}
        className="absolute left-1/2 top-10 -translate-x-1/2"
      />
    </main>
  );
};

export default SearchPage;
