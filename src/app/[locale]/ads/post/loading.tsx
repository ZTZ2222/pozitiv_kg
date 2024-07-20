import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const PostCreateLoading = () => {
  return (
    <main className="container my-10 items-center justify-center md:flex lg:my-0 lg:justify-between">
      <div className="mb-5 mt-5 flex min-h-screen w-full max-w-screen-sm flex-col gap-4 border-gray-50 lg:mb-[100px] lg:mt-10 lg:gap-[30px]">
        <Skeleton className="h-9 w-2/3"></Skeleton>
        <Skeleton className="h-5 w-1/3"></Skeleton>
        <Skeleton className="size-24 rounded-[10px]"></Skeleton>
        {Array.from({ length: 10 }).map((_, index) => (
          <React.Fragment key={index}>
            <Skeleton className="h-5 w-1/3"></Skeleton>
            <Skeleton className="h-24 w-full"></Skeleton>
          </React.Fragment>
        ))}
      </div>
    </main>
  );
};

export default PostCreateLoading;
