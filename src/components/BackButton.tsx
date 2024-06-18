"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useStepper } from "@/hooks/useStepper";

const BackButton = () => {
  const { prevStep, isDisabledStep } = useStepper();
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
