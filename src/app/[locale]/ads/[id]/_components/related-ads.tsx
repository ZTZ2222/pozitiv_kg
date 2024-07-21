import { fetchData } from "@/actions/safe-action";
import AdCard from "@/components/ads/AdCard";
import { zPromotionRead } from "@/types/ad.schema";
import { getLocale, getTranslations } from "next-intl/server";

export const RelatedAds = async ({ id }: { id: number }) => {
  const locale = await getLocale();
  const t = await getTranslations({
    locale: locale,
    namespace: "AdDetailsPage",
  });
  const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/products/related/${id}`;
  const options: RequestInit = {
    cache: "no-store",
    headers: {
      "Accept-Language": locale,
    },
    next: { tags: [`related-ads-for-${id}`] },
  };
  const { data } = await fetchData(endpoint, options);
  const relatedPromotions = data.items;
  if (relatedPromotions.length % 2) {
    relatedPromotions.pop();
  }
  return (
    <section className="mb-[100px]">
      <h2 className="text-lg font-semibold">{t("related-promotions")}</h2>
      <div className="mt-[30px] grid grid-cols-1 gap-4 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
        {relatedPromotions?.map((ad: zPromotionRead) => (
          <AdCard key={ad.id} {...ad} />
        ))}
      </div>
    </section>
  );
};
