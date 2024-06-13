"use client";

import React from "react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "./ui/carousel";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { cn } from "@/utils/Helpers";
import { Card, CardContent } from "./ui/card";
import useMediaQuery from "@/hooks/useMediaQuery";

const Swiper = ({ className }: { className?: string }) => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  const isSmallScreen = useMediaQuery("(max-width: 575px)");

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
        <CarouselContent className="pl-4">
          <CarouselItem className="basis-4/5 sm:basis-full">
            <Card className="rounded-[10px] border-none">
              <CardContent className="relative h-[150px] p-0 md:h-[340px]">
                <Image
                  src={
                    isSmallScreen
                      ? "/assets/swiperImages/dubai_mobile.png"
                      : "/assets/swiperImages/dubai_desktop.png"
                  }
                  alt="Dubai"
                  fill
                  className="rounded-[10px] object-cover object-left"
                />
              </CardContent>
            </Card>
          </CarouselItem>
          <CarouselItem className="basis-4/5 sm:basis-full">
            <Card className="rounded-[10px] border-none">
              <CardContent className="relative h-[150px] p-0 md:h-[340px]">
                <Image
                  src={
                    isSmallScreen
                      ? "/assets/swiperImages/sea_mobile.png"
                      : "/assets/swiperImages/sea_desktop.png"
                  }
                  alt="Dubai"
                  fill
                  className="rounded-[10px] object-cover object-left"
                />
              </CardContent>
            </Card>
          </CarouselItem>
          <CarouselItem className="basis-4/5 sm:basis-full">
            <Card className="rounded-[10px] border-none">
              <CardContent className="relative h-[150px] p-0 md:h-[340px]">
                <Image
                  src={
                    isSmallScreen
                      ? "/assets/swiperImages/dubai_mobile.png"
                      : "/assets/swiperImages/dubai_desktop.png"
                  }
                  alt="Dubai"
                  fill
                  className="rounded-[10px] object-cover object-left"
                />
              </CardContent>
            </Card>
          </CarouselItem>
          <CarouselItem className="basis-4/5 sm:basis-full">
            <Card className="rounded-[10px] border-none">
              <CardContent className="relative h-[150px] p-0 md:h-[340px]">
                <Image
                  src={
                    isSmallScreen
                      ? "/assets/swiperImages/sea_mobile.png"
                      : "/assets/swiperImages/sea_desktop.png"
                  }
                  alt="Dubai"
                  fill
                  className="rounded-[10px] object-cover object-left"
                />
              </CardContent>
            </Card>
          </CarouselItem>
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
