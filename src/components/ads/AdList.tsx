import AdCard from "@/components/ads/AdCard";
import { cn } from "@/lib/utils";
import React from "react";
import { zPromotionRead } from "@/types/ad.schema";

type Props = {
  ads: zPromotionRead[];
  className?: string;
};

const AdList: React.FC<Props> = ({ ads, className }) => {
  return (
    <div
      className={cn(
        "mt-[30px] grid grid-cols-1 gap-4 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5",
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
