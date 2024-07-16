import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const Loading = () => {
  return (
    <main className="container mt-[30px]">
      {/* Banner */}
      <Skeleton className="h-[150px] w-full rounded-[10px] md:h-[245px] lg:h-[340px]"></Skeleton>
      {/* Category List Button Group */}
      <div className="mt-10 flex gap-4 md:hidden">
        <Skeleton className="h-16 w-full rounded-[10px]"></Skeleton>
        <Skeleton className="h-16 w-full rounded-[10px]"></Skeleton>
      </div>
      <div className="my-[100px] hidden grid-cols-3 gap-4 p-4 md:grid lg:grid-cols-4 xl:grid-cols-5">
        {Array.from({ length: 15 }).map((_, index) => (
          <Skeleton
            key={index}
            className="h-16 w-full rounded-[10px]"
          ></Skeleton>
        ))}
      </div>
      {/* Category Modal Button */}
      <Skeleton className="mt-[30px] h-12 w-full rounded-[10px] md:hidden"></Skeleton>
      {/* Tabs */}
      <Skeleton className="mt-[30px] h-10 w-full max-w-[400px] rounded-[10px]"></Skeleton>
      {/* Ads */}
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

export default Loading;
