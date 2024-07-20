import { fetchData } from "@/actions/safe-action";
import AdCard from "@/components/ads/AdCard";
import { zPromotionRead } from "@/types/ad.schema";
import { getLocale, getTranslations } from "next-intl/server";
import React from "react";

const SellerPromotions = async ({ sellerId }: { sellerId: string }) => {
  const locale = await getLocale();
  const t = await getTranslations({
    locale: locale,
    namespace: "ProfilePage",
  });
  const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/products/seller-products/${sellerId}`;
  const options: RequestInit = {
    cache: "no-store",
    credentials: "include",
    headers: {
      "Accept-Language": locale,
    },
    next: { tags: [`seller-ads-${sellerId}`] },
  };
  const { data } = await fetchData(endpoint, options);
  const promotions = data.items;

  if (promotions.length > 0) {
    return (
      <div className="mt-[30px] space-y-[30px] text-gray-800 lg:mt-0 lg:space-y-10">
        <h2 className="text-lg font-semibold lg:text-3xl lg:font-bold">
          {t("seller-promotions")}
        </h2>
        <div className="mt-[30px] grid w-full grid-cols-1 gap-4 xs:grid-cols-2 lg:mt-10 lg:grid-cols-2 xl:grid-cols-3">
          {promotions.map((ad: zPromotionRead) => (
            <AdCard
              key={ad.id}
              {...ad}
              className="lg:min-w-[240px] xl:min-w-[220px]"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-[30px] space-y-[30px] text-gray-800 lg:mt-0 lg:space-y-10">
      <h2 className="text-lg font-semibold lg:text-3xl lg:font-bold">
        {t("seller-promotions")}
      </h2>
      <div className="mx-auto my-[100px] max-w-[300px] space-y-6 text-center">
        <h3 className="text-xl font-medium">
          {t("empty-user-promotions-title")}
        </h3>
        <p className="font-light text-gray-500">
          {t("empty-user-promotions-description")}
        </p>
      </div>
    </div>
  );
};

export default SellerPromotions;
