import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function SellerPageLoading() {
  return (
    <main className="container mb-[100px] mt-[72px] min-h-[60vh] lg:mb-[120px] lg:mt-10 lg:flex lg:min-h-[50vh] lg:gap-[30px]">
      <div className="flex h-fit items-center gap-4 border-b border-gray-300 pb-5 lg:min-w-[300px] lg:flex-col lg:gap-6 lg:border-b-0 lg:p-5 lg:shadow-[0px_0px_4px_0px_#9090904D]">
        <Skeleton className="size-[50px] shrink-0 rounded-full lg:size-[75px]"></Skeleton>
        <div className="space-y-4 text-gray-800">
          <Skeleton className="h-[18px] w-24"></Skeleton>
          <Skeleton className="h-7 w-40"></Skeleton>
          <Skeleton className="h-7 w-full"></Skeleton>
        </div>
      </div>
      <div className="mt-[30px] space-y-[30px] text-gray-800 lg:mt-0 lg:space-y-10">
        <Skeleton className="h-6 w-32"></Skeleton>
        <div className="mt-[30px] grid w-full grid-cols-1 gap-4 xs:grid-cols-2 lg:mt-10 lg:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 10 }).map((_, index) => (
            <Skeleton
              key={index}
              className="h-[350px] w-full md:h-[400px] lg:h-[540px] lg:min-w-[240px] xl:min-w-[220px]"
            ></Skeleton>
          ))}
        </div>
      </div>
    </main>
  );
}
