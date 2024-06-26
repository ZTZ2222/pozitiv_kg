import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Crown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { zPromotionRead } from "@/types/ad.schema";
import AddToFavorites from "../favorites/AddToFavorites";

const AdCard: React.FC<zPromotionRead> = ({
  id,
  name,
  description,
  currency,
  price_after_discount,
  exchange_price_after_discount,
  galleries,
  favorites,
  is_vip,
}) => {
  return (
    <Card className="relative flex h-full flex-col justify-between overflow-hidden border-black">
      <Link href={`/ads/${id}`} className="block h-full w-full">
        {/* Image */}
        <CardHeader className="p-0">
          <div className="relative h-[169px]">
            <Image
              src={
                galleries && galleries.length > 0
                  ? galleries[0].image
                  : "/assets/ads/house_1.png"
              }
              alt={`${name} {index}`}
              fill
              className="object-cover"
              sizes="(max-width: 600px) 100vw, 50vw"
            />
          </div>
        </CardHeader>

        {/* Info */}
        <CardContent className="px-2.5 py-4">
          <CardTitle className="line-clamp-3 text-base font-normal">
            {description}
          </CardTitle>
        </CardContent>

        {/* Prices */}
        <CardFooter className="flex flex-col items-start px-2.5 pb-5">
          <span className="text-lg font-bold text-red-600">
            {exchange_price_after_discount}
          </span>
          <span className="text-lg font-semibold text-green-500">
            {price_after_discount} {currency}
          </span>
        </CardFooter>
      </Link>

      {/* VIP Badge */}
      {is_vip && (
        <span className="absolute left-1 top-5 flex items-center gap-1 rounded-sm bg-red-600 px-1.5 py-1 text-sm font-semibold text-white">
          <Crown className="h-3.5 w-3.5" />
          VIP
        </span>
      )}

      {/* Add to favorites */}
      <AddToFavorites id={id} favorites={favorites} />
    </Card>
  );
};

export default AdCard;
