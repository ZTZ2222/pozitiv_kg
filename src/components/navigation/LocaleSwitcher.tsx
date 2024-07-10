"use client";

import { useLocale } from "next-intl";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";

import { usePathname, useRouter } from "@/lib/i18nNavigation";
import { AppConfig } from "@/lib/i18n";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Globus } from "@/components/icons";

export default function LocaleSwitcher({
  className,
  asSelect,
}: {
  className?: string;
  asSelect?: boolean;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const handleChange = (value: string) => {
    router.push(pathname, { locale: value });
    router.refresh();
  };

  if (asSelect) {
    return (
      <Select onValueChange={handleChange}>
        <SelectTrigger className="h-12 rounded-[10px] border-black/25">
          <div className="flex items-center gap-5">
            <Globus className="size-6 fill-none stroke-current stroke-2" />
            <span>{locale.toLocaleUpperCase()}</span>
          </div>
        </SelectTrigger>
        <SelectContent>
          {AppConfig.locales.map((elt) => (
            <SelectItem key={elt.id} value={elt.id}>
              {elt.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          className={cn(
            "space-x-1.5 fill-none p-2 text-gray-400 focus-visible:ring-offset-0",
            className,
          )}
          variant="ghost"
        >
          <Globus className="size-6 stroke-current stroke-2" />
          <span>{locale.toLocaleUpperCase()}</span>
          <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuRadioGroup value={locale} onValueChange={handleChange}>
          {AppConfig.locales.map((elt) => (
            <DropdownMenuRadioItem key={elt.id} value={elt.id}>
              {elt.name}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
