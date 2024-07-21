import { getAds } from "@/actions/ads-actions";
import AdList from "@/components/ads/AdList";
import EmptyMessage from "@/components/category/EmptyMessage";
import SaveSearch from "@/components/favorites/SaveSearch";
import React from "react";
import { getLocale, getTranslations } from "next-intl/server";
import { getSavedSeaches } from "@/actions/favorite-actions";
import { getUserInfo } from "@/actions/user-actions";
import BreadCrumbs from "@/components/navigation/BreadCrumbs";

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
  const promotions = await getAds(params.toString());
  const currentUser = await getUserInfo();

  let searchList;

  if (currentUser) {
    searchList = await getSavedSeaches();
  }

  return (
    <main className="relative min-h-[75vh]">
      <BreadCrumbs path={["search"]} className="container" />
      {promotions.length > 0 ? (
        <>
          <h1 className="container mb-7 mt-5 text-xl font-medium text-gray-500 lg:text-2xl">
            {t("search-result")}
          </h1>
          <AdList
            initialAds={promotions}
            params={params.toString()}
            className="container mb-10 lg:mb-32"
          />
        </>
      ) : (
        <EmptyMessage />
      )}
      <SaveSearch
        searchList={searchList}
        className="absolute left-1/2 top-9 -translate-x-1/2 md:-top-1"
      />
    </main>
  );
};

export default SearchPage;
