"use client";

import AdCard from "@/components/ads/AdCard";
import { cn } from "@/lib/utils";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { zPromotionRead } from "@/types/ad.schema";
import { getAds } from "@/actions/ads-actions";
import Spinner from "@/components/skeletons/Spinner";

type Props = {
  initialAds: zPromotionRead[];
  params?: string;
  className?: string;
};

const AdList: React.FC<Props> = ({ initialAds, params, className }) => {
  const [ads, setAds] = useState<zPromotionRead[]>(initialAds);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(2);
  const loaderRef = useRef(null);

  const loadMoreAds = useCallback(async () => {
    setLoading(true);

    // Ensure params is a URLSearchParams instance
    const searchParams = new URLSearchParams(params || "");
    searchParams.set("page", page.toString());

    const newAds = await getAds(searchParams.toString());

    setAds((prevAds) => [...prevAds, ...newAds]);
    setLoading(false);
    setPage((prevPage) => prevPage + 1);
  }, [page, params]);

  const handleUpdateFavorites = useCallback(
    (id: number, favorites: number) => {
      setAds((prevAds) =>
        prevAds.map((ad) => (ad.id === id ? { ...ad, favorites } : ad)),
      );
    },
    [setAds],
  );

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    };
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !loading) {
        loadMoreAds();
      }
    }, options);

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [loadMoreAds, loading]);
  return (
    <div
      className={cn(
        "mt-[30px] grid grid-cols-1 gap-4 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5",
        className,
      )}
    >
      {ads?.map((ad: zPromotionRead) => (
        <AdCard key={ad.id} {...ad} onUpdateFavorites={handleUpdateFavorites} />
      ))}
      <div
        ref={loaderRef}
        className="col-span-full flex items-center justify-center"
      >
        {loading && <Spinner className="h-[300px]" />}
      </div>
    </div>
  );
};

export default AdList;
