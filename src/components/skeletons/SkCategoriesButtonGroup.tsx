import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const SkCategoriesButtonGroup = () => {
  return (
    <>
      <div className="container mt-10 flex gap-4 md:hidden">
        <Skeleton className="h-16 w-full rounded-[10px]"></Skeleton>
        <Skeleton className="h-16 w-full rounded-[10px]"></Skeleton>
      </div>
      <div className="container my-[100px] hidden grid-cols-3 gap-4 p-4 md:grid lg:grid-cols-4 xl:grid-cols-5">
        {Array.from({ length: 15 }).map((_, index) => (
          <Skeleton
            key={index}
            className="h-16 w-full rounded-[10px]"
          ></Skeleton>
        ))}
      </div>
    </>
  );
};

export default SkCategoriesButtonGroup;
