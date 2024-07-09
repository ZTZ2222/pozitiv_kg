"use client";

import React from "react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "../ui/carousel";
import Image from "next/image";
// import Autoplay from "embla-carousel-autoplay";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "../ui/card";
import { zGalleryImage } from "@/types/ad.schema";

const AdCarousel = ({
  className,
  images,
  adName,
}: {
  className?: string;
  images: zGalleryImage[];
  adName?: string;
}) => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const handleDotClick = (index: number) => {
    if (api) {
      api.scrollTo(index);
    }
  };
  return (
    <div className={cn("", className)}>
      <Carousel
        setApi={setApi}
        // plugins={[
        //   Autoplay({
        //     delay: 5000,
        //     stopOnInteraction: true,
        //   }),
        // ]}
        className="relative min-w-[300px] overflow-hidden rounded-[10px] md:w-[380px] lg:w-[400px]"
      >
        <CarouselContent className="cursor-grab">
          {images.map((item, index) => (
            <CarouselItem key={index}>
              <Card className="border-none">
                <CardContent className="relative h-[281px] bg-gray-200 p-0 md:h-[317px] lg:h-[352px]">
                  <Image
                    src={item.image || "/assets/other/placeholder.svg"}
                    alt={adName || "Images Carousel"}
                    fill
                    className="object-contain"
                    sizes="100vw"
                    priority
                  />
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute bottom-2.5 right-2.5 rounded-md bg-white/80 px-3 py-1.5 text-sm text-black">
          {current}/{count}
        </div>
      </Carousel>
      <div className="mt-4 hidden justify-center md:flex">
        {Array.from({ length: count }).map((_, index) => (
          <button
            key={index}
            className={`mx-1 h-2.5 w-2.5 rounded-full sm:h-3 sm:w-3 ${
              current - 1 === index
                ? "bg-gradient-to-r from-teal-500 to-cyan-300"
                : "border border-gray-400"
            }`}
            onClick={() => handleDotClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default AdCarousel;
