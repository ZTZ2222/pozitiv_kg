import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const ProfileLoading = () => {
  return (
    <>
      {/* Mobile loading */}
      <main className="container my-[60px] flex flex-col lg:hidden">
        <div className="flex justify-between">
          <Skeleton className="h-8 w-[120px]"></Skeleton>
          <Skeleton className="size-5"></Skeleton>
        </div>
        {/* Avatar Image */}
        <div className="mt-[30px] grid place-content-center">
          <Skeleton className="size-[100px] rounded-full"></Skeleton>
        </div>
        <div className="mt-5 space-y-2.5">
          <Skeleton className="h-4 w-8"></Skeleton>
          <Skeleton className="h-12 w-full rounded-[10px]"></Skeleton>
        </div>
        <div>
          <Skeleton className="mt-[30px] h-6 w-32"></Skeleton>
          <Skeleton className="mt-[20px] h-6 w-full"></Skeleton>
          <div className="mt-[30px] grid grid-cols-1 gap-4 xs:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 10 }).map((_, index) => (
              <Skeleton
                key={index}
                className="h-[350px] w-full md:h-[400px] lg:h-[540px]"
              ></Skeleton>
            ))}
          </div>
        </div>
      </main>
      {/* Desktop loading */}
      <main className="container my-[30px] hidden gap-5 lg:flex lg:gap-[50px]">
        <Skeleton className="flex h-[660px] shrink-0 flex-col rounded-[10px] lg:w-[382px] lg:pb-5 xl:h-[680px] xl:w-[410px]"></Skeleton>
        <div className="w-full">
          <Skeleton className="mt-[30px] h-6 w-32"></Skeleton>
          <Skeleton className="mt-[20px] h-6 w-full lg:w-2/3"></Skeleton>
          <div className="mt-[30px] grid grid-cols-1 gap-4 xs:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 10 }).map((_, index) => (
              <Skeleton
                key={index}
                className="h-[350px] w-full md:h-[400px] lg:h-[540px]"
              ></Skeleton>
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default ProfileLoading;
