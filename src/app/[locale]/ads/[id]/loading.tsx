import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const Loading = () => {
  return (
    <main className="container my-[30px]">
      <div className="items-center justify-center md:flex md:flex-col lg:flex-row lg:items-start lg:justify-start lg:gap-[38px] xl:gap-[49px] 2xl:gap-[60px]">
        <div className="">
          {/* Carousel */}
          <Skeleton className="mb-5 h-[281px] min-w-[300px] rounded-[10px] md:h-[317px] md:w-[380px] lg:h-[352px] lg:w-[400px]"></Skeleton>
          {/* Contact Block */}
          <Skeleton className="mb-[60px] hidden h-[200px] min-w-[200px] rounded-[10px] md:w-[380px] lg:block lg:w-[400px]"></Skeleton>
          {/* User Info Card */}
          <Skeleton className="hidden h-[200px] min-w-[200px] rounded-[10px] md:w-[266px] lg:block lg:w-[280px]"></Skeleton>
        </div>
        <div className="mt-3.5 flex flex-col gap-3.5 md:w-[380px] xl:w-[535px]">
          {/* Description */}
          <Skeleton className="order-4 h-[250px] w-full"></Skeleton>
          {/* Price */}
          <Skeleton className="order-2 h-8 w-28"></Skeleton>
          {/* Price 2 */}
          <Skeleton className="order-3 h-8 w-40"></Skeleton>
          {/* Views */}
          <Skeleton className="order-1 h-4 w-12"></Skeleton>
          {/* Attributes */}
          <Skeleton className="order-5 h-screen w-full"></Skeleton>
        </div>
      </div>
    </main>
  );
};

export default Loading;
