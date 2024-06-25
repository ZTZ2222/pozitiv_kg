"use client";

import { cn } from "@/lib/utils";
import { Heart } from "lucide-react";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useAction } from "next-safe-action/hooks";
import {
  addToFavorites,
  removeFromFavorites,
} from "@/actions/favorite-actions";
import { Button } from "../ui/button";
import { usePathname } from "@/lib/i18nNavigation";

const AddToFavorites = ({
  id,
  favorites,
  variant = "icon",
}: {
  id: number;
  favorites: number;
  variant?: "icon" | "button";
}) => {
  const [isInFavorites, setIsInFavorites] = useState(favorites === 1);
  const { execute: executeAdd, isExecuting: isExecutingAdd } =
    useAction(addToFavorites);
  const { execute: executeRemove, isExecuting: isExecutingRemove } =
    useAction(removeFromFavorites);

  const handleClick = () => {
    if (isInFavorites) {
      executeRemove({ id, favourable_type: "Product" });
    } else {
      executeAdd({ id, favourable_type: "Product" });
    }
    setIsInFavorites(!isInFavorites);
  };

  if (variant === "button") {
    return (
      <Button
        onClick={handleClick}
        disabled={isExecutingAdd || isExecutingRemove}
        variant="contact-favorites"
        size="col-1"
        className="py-3 font-medium"
      >
        {isInFavorites ? "Удалить из избранного" : "Добавить в избранное"}{" "}
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
      disabled={isExecutingAdd || isExecutingRemove}
    >
      <Heart
        className={cn(
          "stroke-1",
          isInFavorites ? "fill-red-600 stroke-red-600" : "",
        )}
      />
    </motion.button>
  );
};

export default AddToFavorites;
