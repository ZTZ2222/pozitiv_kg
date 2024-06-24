import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

const AdDetail = () => {
  const images = ["/assets/ads/house_1.png", "/assets/ads/house_2.png"];
  return (
    <>
      <Carousel className="">
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index} className="relative h-[169px]">
              <Image
                src={image}
                alt={`house ${index}`}
                fill
                className="object-cover"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-1" />
        <CarouselNext className="right-1" />
      </Carousel>
    </>
  );
};

export default AdDetail;
