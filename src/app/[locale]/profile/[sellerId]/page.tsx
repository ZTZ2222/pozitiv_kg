import AdCard from "@/components/ads/AdCard";
import BackButton from "@/components/navigation/BackButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn, getInitials } from "@/lib/utils";
import { zPromotionRead } from "@/types/ad.schema";
import { zSellerRead } from "@/types/user.schema";
import { Phone } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import React from "react";

export const getSellerPromotions = async (
  sellerId: string,
): Promise<zPromotionRead[]> => {
  const locale = await getLocale();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products/seller-products/${sellerId}`,
    {
      cache: "no-store",
      credentials: "include",
      headers: {
        "Accept-Language": locale,
      },
      next: { tags: [`seller-ads-${sellerId}`] },
    },
  );
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const { data } = await response.json();

  return data.items;
};

export const getSellerInfo = async (sellerId: string): Promise<zSellerRead> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/sellers/${sellerId}`,
    {
      cache: "no-store",
      credentials: "include",
      next: { tags: [`seller-info-${sellerId}`] },
    },
  );
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const { data } = await response.json();

  return data;
};

type Props = {
  params: {
    sellerId: string;
  };
};

const SellerProfile: React.FC<Props> = async ({ params }) => {
  const locale = await getLocale();
  const t = await getTranslations({
    locale: locale,
    namespace: "ProfilePage",
  });

  const sellerPromotions = await getSellerPromotions(params.sellerId);
  const sellerInfo = await getSellerInfo(params.sellerId);

  return (
    <>
      <BackButton
        variant="router"
        hidePath
        className="container mt-5 lg:hidden"
      />
      <main className="container mb-[100px] mt-5 min-h-[60vh] lg:mb-[120px] lg:mt-10 lg:flex lg:min-h-[50vh] lg:gap-[30px]">
        <div className="flex h-fit items-center gap-4 border-b border-gray-300 pb-5 lg:flex-col lg:gap-6 lg:border-b-0 lg:p-5 lg:shadow-[0px_0px_4px_0px_#9090904D]">
          <Avatar className="size-[50px] shrink-0 lg:size-[75px]">
            <AvatarImage src={sellerInfo.image} className="object-cover" />
            <AvatarFallback
              className={cn("text-xl font-medium lg:text-3xl", "bg-indigo-200")}
            >
              {getInitials(sellerInfo.name || "Anonymous")}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-4 text-gray-800">
            <span>{sellerInfo.name}</span>
            <div className="flex items-center gap-2 text-lg">
              <Phone className="size-5" />
              {sellerInfo.phone || "Телeфон не указан"}
            </div>
          </div>
        </div>
        <div className="mt-[30px] space-y-[30px] text-gray-800 lg:mt-0 lg:space-y-10">
          <h2 className="text-lg font-semibold lg:text-3xl lg:font-bold">
            {t("seller-promotions")}
          </h2>
          {sellerPromotions.length > 0 ? (
            <div className="mt-[30px] grid w-full grid-cols-1 gap-4 xs:grid-cols-2 lg:mt-10 lg:grid-cols-3 xl:grid-cols-4">
              {sellerPromotions.map((ad: zPromotionRead) => (
                <AdCard
                  key={ad.id}
                  {...ad}
                  className="lg:min-w-[240px] xl:min-w-[220px]"
                />
              ))}
            </div>
          ) : (
            <div className="mx-auto my-[100px] max-w-[300px] space-y-6 text-center">
              <h3 className="text-xl font-medium">
                {t("empty-user-promotions-title")}
              </h3>
              <p className="font-light text-gray-500">
                {t("empty-user-promotions-description")}
              </p>
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default SellerProfile;
