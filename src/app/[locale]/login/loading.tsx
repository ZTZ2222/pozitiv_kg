import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const LoginLoading = () => {
  return (
    <div className="container mb-24 mt-14 flex flex-col items-center gap-12">
      <Skeleton className="size-[100px] rounded-full md:size-[155px]"></Skeleton>
      <Skeleton className="h-16 w-[273px] rounded-[30px]"></Skeleton>
      <Skeleton className="h-7 w-full max-w-[480px]"></Skeleton>
      <Skeleton className="h-10 w-[135px]"></Skeleton>
    </div>
  );
};

export default LoginLoading;
