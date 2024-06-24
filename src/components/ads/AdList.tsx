"use client";

import AdCard from "@/components/ads/AdCard";
import { IAd } from "@/types/ad.interface";
import { ads } from "@/utils/fake_api";
import { cn } from "@/lib/utils";
import React from "react";

const AdList = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "mt-[30px] grid grid-cols-1 gap-4 xs:grid-cols-2",
        className,
      )}
    >
      {ads.map((ad: IAd) => (
        <AdCard key={ad.id} {...ad} />
      ))}
    </div>
  );
};

export default AdList;
