import AdCard from "@/features/ads/AdCard";
import { Ad } from "@/types/ad.interface";
import { cn } from "@/utils/Helpers";
import { useTranslations } from "next-intl";
import React from "react";

export const Ads: Ad[] = [
  {
    id: 1,
    title: "Загородный дом",
    re_area: 120,
    is_favorite: true,
    is_promoted: true,
    price_usd: 78650,
    price_som: 78650 * 89.6,
    images: ["/assets/ads/house_1.png", "/assets/ads/house_2.png"],
  },
  {
    id: 2,
    title: "Загородный дом",
    re_area: 120,
    is_favorite: false,
    is_promoted: false,
    price_usd: 78650,
    price_som: 78650 * 89.6,
    images: ["/assets/ads/house_1.png", "/assets/ads/house_2.png"],
  },
  {
    id: 3,
    title: "Загородный дом",
    re_area: 120,
    is_favorite: true,
    is_promoted: true,
    price_usd: 78650,
    price_som: 78650 * 89.6,
    images: ["/assets/ads/house_1.png", "/assets/ads/house_2.png"],
  },
  {
    id: 4,
    title: "Загородный дом",
    re_area: 120,
    is_favorite: false,
    is_promoted: false,
    price_usd: 78650,
    price_som: 78650 * 89.6,
    images: ["/assets/ads/house_1.png", "/assets/ads/house_2.png"],
  },
];

const RecommendedSection = ({ className }: { className?: string }) => {
  const t = useTranslations("Heading");
  return (
    <section className={cn("container", className)}>
      <h2 className="text-lg font-semibold">{t("recommended_ads")}</h2>
      <div className="mt-[30px] grid grid-cols-2 gap-4">
        {Ads.map((ad) => (
          <AdCard key={ad.id} {...ad} />
        ))}
      </div>
    </section>
  );
};

export default RecommendedSection;
