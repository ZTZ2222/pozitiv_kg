import React from "react";
import { Search as SearchIcon } from "lucide-react";
import { Input } from "./ui/input";
import { useTranslations } from "next-intl";

const Search = () => {
  const t = useTranslations("Search");
  return (
    <div className="relative flex h-9 w-64 items-center rounded-[10px] border border-[#BCBCBC] bg-[#E4E4E4] text-[#8A8A8E] md:h-14 md:w-[480px] md:border-none md:bg-white">
      <SearchIcon className="ml-3 h-6 w-6 md:order-last md:ml-0 md:mr-7" />
      <Input
        type="search"
        placeholder={t("placeholder_mobile")}
        className="h-full border-none px-2 text-base font-light md:hidden"
      />
      <Input
        type="search"
        placeholder={t("placeholder_desktop")}
        className="hidden h-full border-none pl-7 text-lg md:order-1 md:block"
      />
    </div>
  );
};

export default Search;
