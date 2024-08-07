"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useStepper } from "@/hooks/useStepper";
import { usePathname, useRouter } from "@/lib/i18nNavigation";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

type Props = {
  variant: "stepper" | "router";
  location?: string;
  className?: string;
};

const BackButton: React.FC<Props> = ({ variant, location, className }) => {
  const { prevStep, isDisabledStep } = useStepper();
  const router = useRouter();
  const t = useTranslations("BackButton");

  if (variant === "router") {
    return (
      <div className={cn("flex items-center lg:hidden", className)}>
        <Button
          className="flex h-fit shrink-0 justify-start p-1"
          variant="ghost"
          size="icon"
          onClick={() => router.back()}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        {location && (
          <span className={cn("font-light text-gray-400")}>{t(location)}</span>
        )}
      </div>
    );
  }

  return (
    <Button
      disabled={isDisabledStep}
      onClick={prevStep}
      variant="ghost"
      className={cn("h-fit w-fit py-5 pl-0 text-gray-800", className)}
    >
      <ChevronLeft />
    </Button>
  );
};

export default BackButton;
