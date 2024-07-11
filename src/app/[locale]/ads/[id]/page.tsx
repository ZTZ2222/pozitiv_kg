import { getAdInfo, getRelatedAds } from "@/actions/ads-actions";
import { getUserInfo } from "@/actions/user-actions";
import AdCarousel from "@/components/ads/AdCarousel";
import AdDetails from "@/components/ads/AdDetails";
import AdHeading from "@/components/ads/AdHeading";
import AdList from "@/components/ads/AdList";
import ContactBlock from "@/components/ads/ContactBlock";
import Map from "@/components/Map";
import DotsDropdownMenu from "@/components/navigation/DotsDropdownMenu";
import ShareButton from "@/components/navigation/ShareButton";
import UserInfoCard from "@/components/profile/UserInfoCard";
import { CircleAlert } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import React from "react";

const AdDetail = async ({ params }: { params: { id: string } }) => {
  const locale = await getLocale();
  const t = await getTranslations({
    locale: locale,
    namespace: "AdDetailsPage",
  });

  const promotion = await getAdInfo(params.id);
  const relatedPromotions = await getRelatedAds(params.id);
  const currentUser = await getUserInfo();

  let chatId = undefined;

  if (promotion && currentUser) {
    chatId = `${promotion.id}_${currentUser.id}`;
  }

  return (
    <main className="container mt-[30px]">
      <div className="items-center justify-center md:flex md:flex-col lg:flex-row lg:items-start lg:justify-start lg:gap-[38px] xl:gap-[49px] 2xl:gap-[60px]">
        <div>
          <AdCarousel
            images={promotion.galleries}
            adName={promotion.name}
            className="mb-5"
          />
          <ContactBlock
            promotion={promotion}
            currentUser={currentUser}
            chatId={chatId}
            className="mb-[60px] hidden lg:flex"
          />
          <UserInfoCard
            seller={promotion.seller}
            className="mb-[30px] hidden lg:inline-flex"
          />
        </div>
        <div className="md:w-[380px] xl:w-[535px]">
          {promotion.owner_status === "pending" && (
            <div className="mb-5 flex items-center gap-4 rounded-[10px] bg-blue-400 px-5 py-2.5 text-xs text-gray-50 lg:max-w-[405px] lg:text-sm">
              <CircleAlert className="shrink-0" />
              <span>{t("promotion-deactivated-alert")}</span>
            </div>
          )}
          <AdHeading {...promotion} className="mb-[60px]" />
          <ContactBlock
            promotion={promotion}
            currentUser={currentUser}
            chatId={chatId}
            className="mb-[60px] lg:hidden"
          />
          <AdDetails attributes={promotion.attribute} className="mb-[60px]" />
          <Map className="mb-[40px]" />
        </div>
        <div className="hidden h-fit gap-2.5 lg:flex">
          <ShareButton />
          <DotsDropdownMenu promotion={promotion} currentUser={currentUser} />
        </div>
        <UserInfoCard
          seller={promotion.seller}
          className="mb-[30px] lg:hidden"
        />
      </div>
      <section className="mb-[100px]">
        <h2 className="text-lg font-semibold">{t("related-promotions")}</h2>
        <AdList ads={relatedPromotions} />
      </section>
    </main>
  );
};

export default AdDetail;
