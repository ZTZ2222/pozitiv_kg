import BackButton from "@/components/navigation/BackButton";
import React, { Suspense } from "react";
import SellerPromotions from "./seller-promotions";
import SellerCard from "./seller-card";
import SkSellerCard from "@/components/skeletons/SkSellerCard";
import SkSellerPromotions from "@/components/skeletons/SkSellerPromotions";
import BreadCrumbs from "@/components/navigation/BreadCrumbs";

type Props = {
  params: {
    sellerId: string;
  };
};

const SellerProfile: React.FC<Props> = async ({ params }) => {
  return (
    <>
      <BackButton
        variant="router"
        location="seller"
        className="container mt-5 lg:hidden"
      />
      <BreadCrumbs path={["seller"]} className="container" />
      <main className="container mb-[100px] mt-5 min-h-[60vh] lg:mb-[120px] lg:mt-10 lg:flex lg:min-h-[50vh] lg:gap-[30px]">
        <Suspense fallback={<SkSellerCard />}>
          <SellerCard sellerId={params.sellerId} />
        </Suspense>
        <Suspense fallback={<SkSellerPromotions />}>
          <SellerPromotions sellerId={params.sellerId} />
        </Suspense>
      </main>
    </>
  );
};

export default SellerProfile;
