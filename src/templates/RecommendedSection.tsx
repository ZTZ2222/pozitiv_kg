import AdCard from "@/features/ads/AdCard";
import { Ad } from "@/types/ad.interface";
import { cn } from "@/utils/Helpers";
import { useTranslations } from "next-intl";
import React from "react";
import { ads } from "@/utils/fake_api";

const RecommendedSection = ({ className }: { className?: string }) => {
  const t = useTranslations("Heading");
  return (
    <section className={cn("container", className)}>
      <h2 className="text-lg font-semibold">{t("recommended_ads")}</h2>
      <div className="mt-[30px] grid grid-cols-2 gap-4">
        {ads.map((ad: Ad) => (
          <AdCard key={ad.id} {...ad} />
        ))}
      </div>
    </section>
  );
};

export default RecommendedSection;
