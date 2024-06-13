"use client";

import React from "react";
import { Search as SearchIcon } from "lucide-react";
import { Input } from "./ui/input";
import { useTranslations } from "next-intl";
import { cn } from "@/utils/Helpers";
import useMediaQuery from "@/hooks/useMediaQuery";

interface SearchProps {
  className?: string;
}

const Search: React.FC<SearchProps> = ({ className }) => {
  const t = useTranslations("Search");
  const isSmallScreen = useMediaQuery("(max-width: 768px)");
  return (
    <div
      className={cn(
        "relative flex h-9 w-64 items-center rounded-[10px] border border-[#BCBCBC] bg-gray-200 text-gray-400 has-[:focus]:ring-1 has-[:focus]:ring-cyan-400 md:h-14 md:w-[480px] md:border-none md:bg-white",
        className,
      )}
    >
      <SearchIcon className="ml-3 h-6 w-6 md:order-last md:ml-0 md:mr-7" />
      {isSmallScreen ? (
        <Input
          type="search"
          placeholder={t("placeholder_mobile")}
          className="h-full border-none bg-gray-200 px-2 text-base font-light text-gray-700"
        />
      ) : (
        <Input
          type="search"
          placeholder={t("placeholder_desktop")}
          className="h-full border-none bg-gray-200 pl-7 text-lg text-gray-700 md:order-1"
        />
      )}
    </div>
  );
};

export default Search;
