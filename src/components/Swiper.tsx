"use client";

import React from "react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "./ui/card";
import Link from "next/link";
import { zBannerRead } from "@/types/banner.schema";

const Swiper = ({
  className,
  images,
}: {
  className?: string;
  images: zBannerRead[];
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
    <div className={cn("sm:container", className)}>
      <Carousel
        setApi={setApi}
        plugins={[
          Autoplay({
            delay: 5000,
            stopOnInteraction: true,
          }),
        ]}
      >
        <CarouselContent className="mr-4 cursor-grab pl-4 sm:mr-0 md:-ml-5">
          {images.map((item, index) => (
            <CarouselItem key={index} className="basis-[90%] sm:basis-full">
              <Link href={item.link} prefetch>
                <Card className="rounded-[10px] border-none">
                  <CardContent className="relative h-[150px] p-0 md:h-[245px] lg:h-[340px]">
                    <Image
                      src={item.banner}
                      alt={item.link}
                      fill
                      className="rounded-[10px] object-cover object-left"
                      priority
                      sizes="100vw"
                    />
                  </CardContent>
                </Card>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="mt-4 flex justify-center">
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

export default Swiper;
