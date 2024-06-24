import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Crown, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { zPromotionRead } from "@/types/ad.schema";

const AdCard: React.FC<zPromotionRead> = ({
  name,
  description,
  currency,
  price_after_discount,
  exchange_price_after_discount,
  attribute,
  galleries,
  favorites,
  is_vip,
}) => {
  return (
    <Link href="#">
      <Card className="relative flex h-full flex-col justify-between overflow-hidden border-black">
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
          <CardTitle className="line-clamp-2 text-base font-medium">
            {name},{" "}
            {(attribute &&
              attribute.length > 0 &&
              attribute.find((attr) => attr.title === "Площадь")?.value) ||
              ""}{" "}
            м<sup>2</sup>
          </CardTitle>
          <CardDescription className="line-clamp-2 text-sm font-light">
            {description},{" "}
            {(attribute &&
              attribute.length > 0 &&
              attribute.find((attr) => attr.title === "Площадь")?.value) ||
              ""}{" "}
            м<sup>2</sup>
          </CardDescription>
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

        {/* VIP Badge */}
        {is_vip && (
          <span className="absolute left-1 top-5 flex items-center gap-1 rounded-sm bg-red-600 px-1.5 py-1 text-sm font-semibold text-white">
            <Crown className="h-3.5 w-3.5" />
            VIP
          </span>
        )}

        {/* Add to favorites */}
        <span className="absolute bottom-[53%] right-1 rounded-full bg-white px-1.5 py-1.5 shadow-[0px_4px_4px_0px_#00000040]">
          <Heart
            className={cn(
              "stroke-1",
              favorites && "fill-red-600 stroke-red-600",
            )}
          />
        </span>
      </Card>
    </Link>
  );
};

export default AdCard;
