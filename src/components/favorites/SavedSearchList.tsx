"use client";

import { zSearchRead } from "@/types/other.schema";
import React from "react";
import { Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useOptimisticAction } from "next-safe-action/hooks";
import { deleteSearch } from "@/actions/favorite-actions";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";

type Props = {
  savedSearches: zSearchRead[];
  className?: string;
};

const SavedSearchList: React.FC<Props> = ({ savedSearches, className }) => {
  const { execute, optimisticState } = useOptimisticAction(deleteSearch, {
    currentState: savedSearches,
    updateFn: (savedSearches, { id }) => {
      return savedSearches.filter((savedSearch) => savedSearch.id !== id);
    },
  });

  return (
    <div className={cn("divide-y divide-[#AECFD1]", className)}>
      {optimisticState.map((savedSearch) => (
        <div
          key={savedSearch.id}
          className="flex items-center justify-between py-4"
        >
          <div>
            <h4 className="font-semibold text-gray-800">{savedSearch.title}</h4>
            <p className="text-gray-400">{savedSearch.title}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              execute({ id: savedSearch.id });
              toast({
                description: "Вы успешно отписались от поиска.",
                duration: 3000,
              });
            }}
          >
            <Trash2 className="mx-1 size-[18px]" />
          </Button>
        </div>
      ))}
    </div>
  );
};

export default SavedSearchList;
