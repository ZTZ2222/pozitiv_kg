import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const SkSellerCard = () => {
  return (
    <div className="flex h-fit items-center gap-4 border-b border-gray-300 pb-5 lg:min-w-[300px] lg:flex-col lg:gap-6 lg:border-b-0 lg:p-5 lg:shadow-[0px_0px_4px_0px_#9090904D]">
      <Skeleton className="size-[50px] shrink-0 rounded-full lg:size-[75px]"></Skeleton>
      <div className="space-y-4 text-gray-800">
        <Skeleton className="h-[18px] w-24"></Skeleton>
        <Skeleton className="h-7 w-40"></Skeleton>
        <Skeleton className="h-7 w-full"></Skeleton>
      </div>
    </div>
  );
};

export default SkSellerCard;
