import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const SkSellerPromotions = () => {
  return (
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
  );
};

export default SkSellerPromotions;
