import { getAdInfo, getRelatedAds } from "@/actions/ads-actions";
import AdCarousel from "@/components/ads/AdCarousel";
import AdDetails from "@/components/ads/AdDetails";
import AdHeading from "@/components/ads/AdHeading";
import AdList from "@/components/ads/AdList";
import ContactBlock from "@/components/ads/ContactBlock";
import Map from "@/components/Map";
import UserInfoCard from "@/components/profile/UserInfoCard";
import React from "react";

const AdDetail = async ({ params }: { params: { id: string } }) => {
  const promotion = await getAdInfo(params.id);
  const relatedPromotions = await getRelatedAds(params.id);
  return (
    <main className="container mt-[30px]">
      <AdCarousel
        images={promotion.galleries}
        adName={promotion.name}
        className="mb-5"
      />
      <AdHeading {...promotion} className="mb-[60px]" />
      <ContactBlock
        id={promotion.id}
        favorites={promotion.favorites}
        createdAt={promotion.created_at}
        updatedAt={promotion.updated_at}
        className="mb-[60px]"
      />
      <AdDetails attributes={promotion.attribute} className="mb-[60px]" />
      <Map className="mb-[40px]" />
      <UserInfoCard seller={promotion.seller} className="mb-[30px]" />
      <section className="mb-[100px]">
        <h2 className="text-lg font-semibold">Похожие объявления</h2>
        <AdList ads={relatedPromotions} />
      </section>
    </main>
  );
};

export default AdDetail;
