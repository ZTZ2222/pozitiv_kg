import AdCard from "@/components/ads/AdCard";
import { cn } from "@/lib/utils";
import React from "react";
import { zPromotionRead } from "@/types/ad.schema";
import { getAds } from "@/actions/ads-actions";

const AdList = async ({ className }: { className?: string }) => {
  const ads = await getAds();
  return (
    <div
      className={cn(
        "mt-[30px] grid grid-cols-1 gap-4 xs:grid-cols-2",
        className,
      )}
    >
      {ads.map((ad: zPromotionRead) => (
        <AdCard key={ad.id} {...ad} />
      ))}
    </div>
  );
};

export default AdList;
