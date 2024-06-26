"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useStepper } from "@/hooks/useStepper";
import { useRouter } from "@/lib/i18nNavigation";

const BackButton = ({ variant }: { variant: "stepper" | "router" }) => {
  const { prevStep, isDisabledStep } = useStepper();
  const router = useRouter();

  if (variant === "router") {
    return (
      <Button
        className="flex h-fit shrink-0 justify-start p-1"
        variant="ghost"
        size="icon"
        onClick={() => router.back()}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
    );
  }

  return (
    <Button
      disabled={isDisabledStep}
      onClick={prevStep}
      variant="ghost"
      className="h-fit w-fit py-5 pl-0 text-gray-800"
    >
      <ChevronLeft />
    </Button>
  );
};

export default BackButton;
