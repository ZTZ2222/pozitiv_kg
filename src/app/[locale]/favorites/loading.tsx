import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const Loading = () => {
  return (
    <main className="container mb-[100px] mt-[30px] flex flex-col">
      <Skeleton className="h-10 w-full max-w-[360px]"></Skeleton>
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
