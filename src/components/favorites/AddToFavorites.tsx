"use client";

import { cn } from "@/lib/utils";
import { Heart } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";
import { useOptimisticAction } from "next-safe-action/hooks";
import { updateFavorites } from "@/actions/favorite-actions";
import { Button } from "../ui/button";

const AddToFavorites = ({
  id,
  favorites,
  variant = "icon",
}: {
  id: number;
  favorites: number;
  variant?: "icon" | "button";
}) => {
  const { execute, isExecuting, optimisticState } = useOptimisticAction(
    updateFavorites,
    {
      currentState: favorites,
      updateFn: (optimisticState) => (optimisticState === 0 ? 1 : 0),
    },
  );

  const handleClick = () => {
    const action = optimisticState === 1 ? "remove" : "add";
    execute({ id, favourable_type: "Product", action });
  };

  if (variant === "button") {
    return (
      <Button
        onClick={handleClick}
        disabled={isExecuting}
        variant="contact-favorites"
        size="col-1"
        className="py-3 font-medium"
      >
        {optimisticState === 1
          ? "Удалить из избранного"
          : "Добавить в избранное"}{" "}
        <Heart className="size-5 fill-white" />
      </Button>
    );
  }

  return (
    <motion.button
      onClick={handleClick}
      whileTap={{ scale: 0.8, rotate: -20 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="absolute bottom-[53%] right-1 rounded-full bg-white px-1.5 py-1.5 shadow-[0px_4px_4px_0px_#00000040]"
      disabled={isExecuting}
    >
      <Heart
        className={cn(
          "stroke-1",
          optimisticState === 1
            ? "fill-red-600 stroke-red-600"
            : "fill-white stroke-black",
        )}
      />
    </motion.button>
  );
};

export default AddToFavorites;
