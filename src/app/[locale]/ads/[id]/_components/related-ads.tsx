import { fetchData } from "@/actions/safe-action";
import AdList from "@/components/ads/AdList";
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
      <AdList ads={relatedPromotions} />
    </section>
  );
};
