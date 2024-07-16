import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const CategoryPromotionsLoading = () => {
  return (
    <main className="container flex flex-col">
      <div className="mt-7 flex gap-4 overflow-hidden">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className="h-9 w-24"></Skeleton>
        ))}
      </div>
      <div className="mt-[30px] grid grid-cols-1 gap-4 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
        {Array.from({ length: 10 }).map((_, index) => (
          <Skeleton
            key={index}
            className="h-[350px] w-full md:h-[400px] lg:h-[540px]"
          ></Skeleton>
        ))}
      </div>
    </main>
  );
};

export default CategoryPromotionsLoading;
