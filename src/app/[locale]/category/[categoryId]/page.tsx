import { getAds } from "@/actions/ads-actions";
import { getCategoryById } from "@/actions/category-actions";
import AdList from "@/components/ads/AdList";
import EmptyMessage from "@/components/category/EmptyMessage";
import BreadCrumbs from "@/components/navigation/BreadCrumbs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

type Props = {
  params: { categoryId: string };
};

const CategoryPromotionList: React.FC<Props> = async ({
  params: { categoryId },
}) => {
  const searchParams = new URLSearchParams({
    sort_by: "latest",
    category_id: categoryId,
  });

  const category = await getCategoryById({ id: categoryId });
  const promotions = await getAds(searchParams.toString());

  return (
    <main>
      <BreadCrumbs
        path={[
          "category",
          { name: category.name, href: category.id.toString() },
        ]}
        className="container"
      />
      <ScrollArea
        className={cn(
          "ml-4 md:container",
          category.childs && category.childs.length > 0 && "mt-7",
        )}
      >
        <div className="mr-4 flex gap-4">
          {category.childs?.map((child) => (
            <Link
              key={child.id}
              href={`/category/${child.id}`}
              // prefetch
              className="inline-flex items-center justify-center whitespace-nowrap rounded-[10px] border border-input bg-background px-2.5 py-1.5 transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              {child.name}
            </Link>
          ))}
        </div>
        <ScrollBar className="hidden h-1.5 md:flex" orientation="horizontal" />
      </ScrollArea>
      {promotions.length > 0 ? (
        <>
          <AdList
            initialAds={promotions}
            params={searchParams.toString()}
            className="container mb-10"
          />
        </>
      ) : (
        <EmptyMessage />
      )}
    </main>
  );
};

export default CategoryPromotionList;
