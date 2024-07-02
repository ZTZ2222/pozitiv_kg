import { getAds } from "@/actions/ads-actions";
import { getBanners } from "@/actions/banner-actions";
import { getCategoryById } from "@/actions/category-actions";
import AdList from "@/components/ads/AdList";
import EmptyMessage from "@/components/category/EmptyMessage";
import Swiper from "@/components/Swiper";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Link from "next/link";
import React from "react";

type Props = {
  params: { categoryId: string };
};

const CategoryPromotionList: React.FC<Props> = async ({
  params: { categoryId },
}) => {
  const params = new URLSearchParams({
    sort_by: "latest",
    category_id: categoryId,
  });

  const category = await getCategoryById({ id: categoryId });
  const promotions = await getAds(params);
  const banners = await getBanners();

  return (
    <main>
      <ScrollArea className="ml-4 mt-7">
        <div className="mr-4 flex gap-4">
          {category.childs?.map((child) => (
            <Link
              key={child.id}
              href={`/category/${child.id}`}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-[10px] border border-input bg-background px-3.5 py-2.5 transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              {child.name}
            </Link>
          ))}
        </div>
        <ScrollBar className="hidden h-1.5 md:flex" orientation="horizontal" />
      </ScrollArea>
      {promotions.length > 0 ? (
        <>
          <AdList ads={promotions} className="container mb-10" />
          <Swiper images={banners} className="mb-10" />
        </>
      ) : (
        <EmptyMessage />
      )}
    </main>
  );
};

export default CategoryPromotionList;
