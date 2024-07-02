import { getAds } from "@/actions/ads-actions";
import { getBanners } from "@/actions/banner-actions";
import AdList from "@/components/ads/AdList";
import EmptyMessage from "@/components/category/EmptyMessage";
import Swiper from "@/components/Swiper";
import React from "react";

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
  const params = new URLSearchParams(searchParams);
  const promotions = await getAds(params);
  const banners = await getBanners();

  return (
    <>
      {promotions.length > 0 ? (
        <>
          <AdList ads={promotions} className="container mb-10" />
          <Swiper images={banners} className="mb-10" />
        </>
      ) : (
        <EmptyMessage />
      )}
    </>
  );
};

export default SearchPage;
