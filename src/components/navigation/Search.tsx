"use client";

import React, { useEffect, useState } from "react";
import { Search as SearchIcon } from "lucide-react";
import { Input } from "../ui/input";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import useMediaQuery from "@/hooks/useMediaQuery";
import { useSearchParams } from "next/navigation";
import { usePathname, useRouter } from "@/lib/i18nNavigation";
import { useDebouncedCallback } from "use-debounce";

interface SearchProps {
  className?: string;
}

const Search: React.FC<SearchProps> = ({ className }) => {
  const t = useTranslations("Search");
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { push } = useRouter();

  const [query, setQuery] = useState(
    searchParams.get("search")?.toString() || "",
  );

  useEffect(() => {
    setQuery(searchParams.get("search")?.toString() || "");
  }, [pathname]);

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }

    push(`/search?${params.toString()}`);
  }, 900);
  return (
    <div
      className={cn(
        "relative flex h-9 w-full items-center rounded-[10px] border border-[#BCBCBC] bg-gray-200 text-gray-400 has-[:focus]:ring-2 has-[:focus]:ring-cyan-200 lg:h-14 lg:w-[480px] lg:border-none lg:bg-white",
        className,
      )}
    >
      <SearchIcon className="ml-3 h-6 w-6 lg:order-last lg:ml-0 lg:mr-7" />
      {isDesktop ? (
        <Input
          type="search"
          placeholder={t("placeholder_desktop")}
          className="h-full border-none pl-7 text-lg text-gray-700 lg:order-1"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            handleSearch(e.target.value);
          }}
        />
      ) : (
        <Input
          type="search"
          placeholder={t("placeholder_mobile")}
          className="h-full border-none bg-gray-200 px-2 text-base font-light text-gray-700"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            handleSearch(e.target.value);
          }}
        />
      )}
    </div>
  );
};

export default Search;
