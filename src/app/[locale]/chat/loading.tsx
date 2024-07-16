import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const Loading = () => {
  return (
    <>
      {/* Mobile loading */}
      <main className="container flex h-screen flex-col space-y-2.5 lg:hidden">
        {Array.from({ length: 10 }).map((_, index) => (
          <Skeleton key={index} className="h-20 w-full"></Skeleton>
        ))}
      </main>
      {/* Desktop loading */}
      <main className="container my-[30px] hidden gap-5 lg:flex">
        <div className="flex h-[660px] flex-col rounded-[10px] lg:w-[382px] lg:pb-5 lg:shadow-[0px_0px_4px_0px_#9090904D] xl:h-[680px] xl:w-[410px]">
          {Array.from({ length: 10 }).map((_, index) => (
            <Skeleton key={index} className="h-20 w-full"></Skeleton>
          ))}
        </div>
        <Skeleton className="h-[660px] w-full lg:shadow-[0px_0px_4px_0px_#9090904D] xl:h-[680px]"></Skeleton>
      </main>
    </>
  );
};

export default Loading;
