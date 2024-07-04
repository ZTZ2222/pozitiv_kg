"use client";

import React, { useState } from "react";
import { Heart } from "@/components/icons";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { useOptimisticAction } from "next-safe-action/hooks";
import { saveSearch } from "@/actions/favorite-actions";
import { zSearchRead } from "@/types/other.schema";

type Props = {
  searchList: zSearchRead[];
  className?: string;
};

const SaveSearch: React.FC<Props> = ({ searchList, className }) => {
  const params = useSearchParams();

  const { execute, optimisticState } = useOptimisticAction(saveSearch, {
    currentState: searchList,
    updateFn: (savedSearches) => [
      ...savedSearches,
      {
        id: Math.floor(Math.random() * 1000000) + 1,
        title: params.get("search")!,
        query: `?${params.toString()}`,
        type: 1,
      },
    ],
  });

  const isQuerySaved =
    optimisticState?.filter((item) => item.query === `?${params.toString()}`)
      .length > 0;

  return (
    <button
      className={cn(
        "flex items-center gap-3 text-nowrap px-4 py-2 font-medium lg:px-5 lg:py-2.5",
        "rounded-full border border-green-500 transition-all ease-in-out",
        "disabled:cursor-not-allowed",
        isQuerySaved
          ? "bg-green-500 fill-white text-white"
          : "bg-white fill-green-500 text-green-500",
        className,
      )}
      onClick={() =>
        execute({
          title: params.get("search")!,
          result: `?${params.toString()}`,
          type: 1,
        })
      }
      disabled={isQuerySaved}
    >
      <Heart className="size-5" />
      {isQuerySaved ? "Вы подписаны на поиск" : "Подписаться на поиск"}
    </button>
  );
};

export default SaveSearch;
