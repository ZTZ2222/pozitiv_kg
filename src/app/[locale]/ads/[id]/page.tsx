import { getAdInfo, getRelatedAds } from "@/actions/ads-actions";
import AdCarousel from "@/components/ads/AdCarousel";
import AdDetails from "@/components/ads/AdDetails";
import AdHeading from "@/components/ads/AdHeading";
import AdList from "@/components/ads/AdList";
import ContactBlock from "@/components/ads/ContactBlock";
import Map from "@/components/Map";
import DotsDropdownMenu from "@/components/navigation/DotsDropdownMenu";
import UserInfoCard from "@/components/profile/UserInfoCard";
import { Button } from "@/components/ui/button";
import { Share } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import React from "react";

const AdDetail = async ({ params }: { params: { id: string } }) => {
  const locale = await getLocale();
  const t = await getTranslations({
    locale: locale,
    namespace: "Header",
  });

  const promotion = await getAdInfo(params.id);
  const relatedPromotions = await getRelatedAds(params.id);

  return (
    <main className="container mt-[30px]">
      <div className="items-center justify-center md:flex md:flex-col lg:flex-row lg:items-start lg:justify-between">
        <div>
          <AdCarousel
            images={promotion.galleries}
            adName={promotion.name}
            className="mb-5"
          />
          <ContactBlock
            id={promotion.id}
            favorites={promotion.favorites}
            createdAt={promotion.created_at}
            updatedAt={promotion.updated_at}
            className="mb-[60px] hidden lg:flex"
          />
          <UserInfoCard
            seller={promotion.seller}
            className="mb-[30px] hidden lg:inline-flex"
          />
        </div>
        <div className="md:w-[380px] xl:w-[535px]">
          <AdHeading {...promotion} className="mb-[60px]" />
          <ContactBlock
            id={promotion.id}
            favorites={promotion.favorites}
            createdAt={promotion.created_at}
            updatedAt={promotion.updated_at}
            className="mb-[60px] lg:hidden"
          />
          <AdDetails attributes={promotion.attribute} className="mb-[60px]" />
          <Map className="mb-[40px]" />
        </div>
        <div className="hidden h-fit gap-2.5 lg:flex">
          <Button
            variant="ghost"
            size="xs"
            className="h-fit gap-1.5 text-fuchsia-500 hover:bg-inherit"
          >
            {t("share")} <Share className="size-5" />
          </Button>

          <DotsDropdownMenu />
        </div>
        <UserInfoCard
          seller={promotion.seller}
          className="mb-[30px] lg:hidden"
        />
      </div>
      <section className="mb-[100px]">
        <h2 className="text-lg font-semibold">Похожие объявления</h2>
        <AdList ads={relatedPromotions} />
      </section>
    </main>
  );
};

export default AdDetail;
