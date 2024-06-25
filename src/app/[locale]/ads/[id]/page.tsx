import { getAdInfo } from "@/actions/ads-actions";
import AdCarousel from "@/components/ads/AdCarousel";
import AdDetails from "@/components/ads/AdDetails";
import AdHeading from "@/components/ads/AdHeading";
import ContactBlock from "@/components/ads/ContactBlock";
import React from "react";

const AdDetail = async ({ params }: { params: { id: string } }) => {
  const promotion = await getAdInfo(params.id);
  return (
    <main className="container mt-[30px]">
      <AdCarousel images={promotion.galleries} adName={promotion.name} />
      <AdHeading {...promotion} />
      <ContactBlock
        id={promotion.id}
        favorites={promotion.favorites}
        createdAt={promotion.created_at}
        updatedAt={promotion.updated_at}
        className="my-12"
      />
      <AdDetails />
    </main>
  );
};

export default AdDetail;
