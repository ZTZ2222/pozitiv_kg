import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Ad } from "@/types/ad.interface";
import { cn } from "@/utils/Helpers";
import { Crown, Heart } from "lucide-react";
import Image from "next/image";
import React from "react";

const AdCard: React.FC<Ad> = ({
  id,
  title,
  re_area,
  is_favorite,
  is_promoted,
  price_usd,
  price_som,
  images,
}) => {
  return (
    <Card className="relative overflow-hidden border-black">
      <CardHeader className="p-0">
        <div className="relative h-[169px]">
          <Image
            src={images[0]}
            alt={`${title} {index}`}
            fill
            className="object-cover"
          />
        </div>
      </CardHeader>
      <CardContent className="px-2.5 py-4">
        <CardTitle className="text-wrap text-lg font-medium">
          {title}, {re_area} м<sup>2</sup>
        </CardTitle>
        <CardDescription className="text-wrap text-base font-light">
          {title}, {re_area} м<sup>2</sup>
        </CardDescription>
      </CardContent>
      <CardFooter className="flex flex-col items-start px-2.5 pb-5">
        <span className="text-lg font-bold text-red-600">
          {price_som.toLocaleString().replace(/,/g, " ")} сом
        </span>
        <span className="text-lg font-semibold text-green-500">
          {price_usd.toLocaleString().replace(/,/g, " ")} $
        </span>
      </CardFooter>
      {is_promoted && (
        <span className="absolute left-1 top-5 flex items-center gap-1 rounded-sm bg-red-600 px-1.5 py-1 text-sm font-semibold text-white">
          <Crown className="h-3.5 w-3.5" />
          VIP
        </span>
      )}

      <span className="absolute bottom-[53%] right-1 rounded-full bg-white px-1.5 py-1.5 shadow-[0px_4px_4px_0px_#00000040]">
        <Heart
          className={cn(
            "stroke-1",
            is_favorite && "fill-red-600 stroke-red-600",
          )}
        />
      </span>
    </Card>
  );
};

export default AdCard;
