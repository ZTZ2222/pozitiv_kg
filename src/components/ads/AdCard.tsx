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
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

interface AdCardProps extends zPromotionRead {
  onUpdateFavorites?: (id: number, favorites: number) => void;
  className?: string;
}

const AdCard: React.FC<AdCardProps> = ({
  id,
  name,
  description,
  currency,
  price_after_discount,
  exchange_price_after_discount,
  galleries,
  favorites,
  is_vip,
  onUpdateFavorites,
  className,
}) => {
  const t = useTranslations("Button");
  return (
    <Card
      className={cn(
        "relative flex h-full flex-col justify-between overflow-hidden border-black",
        className,
      )}
    >
      <Link
        href={`/ads/${id}`}
        // prefetch
        className="block h-full w-full"
      >
        {/* Image */}
        <CardHeader className="p-0">
          <div className="relative h-[169px] bg-gray-300 md:h-[220px] lg:h-[280px]">
            <Image
              src={
                galleries && galleries.length > 0
                  ? galleries[0].image
                  : "/assets/other/placeholder.svg"
              }
              alt={`${name} {index}`}
              fill
              // className="object-contain"
              className="object-cover"
              sizes="(max-width: 320px) 100vw, (max-width: 767px) 50vw, 33vw"
            />
          </div>
        </CardHeader>

        {/* Info */}
        <CardContent className="min-h-[104px] px-2.5 py-4 lg:min-h-[116px]">
          <CardTitle className="line-clamp-3 text-pretty text-base font-normal lg:text-lg">
            {description}
          </CardTitle>
        </CardContent>

        {/* Prices */}
        <CardFooter className="flex flex-col items-start px-2.5 pb-5">
          <span className="text-lg font-bold text-red-600 lg:text-xl lg:font-extrabold">
            {exchange_price_after_discount}
          </span>
          <span className="text-lg font-semibold text-green-500 lg:text-2xl">
            {price_after_discount} {currency}
          </span>
          <div className="mt-5 hidden w-full rounded-[10px] border border-cyan-400 py-1.5 text-center text-lg hover:bg-gray-100 lg:block">
            {t("more-details")}
          </div>
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
      <AddToFavorites
        id={id}
        favorites={favorites}
        onUpdateFavorites={onUpdateFavorites}
      />
    </Card>
  );
};

export default AdCard;
