import { LucideIcon } from "lucide-react";

// ICON TYPE
export type IconType = LucideIcon | React.ComponentType<any> | undefined;

// STEP ICON PROPS
export interface StepIconProps {
  isCompletedStep?: boolean;
  isCurrentStep?: boolean;
  isError?: boolean;
  isLoading?: boolean;
  isKeepError?: boolean;
  icon?: IconType;
  index?: number;
  checkIcon?: IconType;
  errorIcon?: IconType;
}

// STEP OPTIONS
export interface StepOptions {
  orientation?: "vertical" | "horizontal";
  state?: "loading" | "error";
  responsive?: boolean;
  checkIcon?: IconType;
  errorIcon?: IconType;
  onClickStep?: (step: number, setStep: (step: number) => void) => void;
  mobileBreakpoint?: string;
  variant?: "circle" | "circle-alt" | "line";
  expandVerticalSteps?: boolean;
  size?: "sm" | "md" | "lg";
  styles?: {
    "main-container"?: string;
    "horizontal-step"?: string;
    "horizontal-step-container"?: string;
    "vertical-step"?: string;
    "vertical-step-container"?: string;
    "vertical-step-content"?: string;
    "step-button-container"?: string;
    "step-label-container"?: string;
    "step-label"?: string;
    "step-description"?: string;
  };
  variables?: {
    "--step-icon-size"?: string;
    "--step-gap"?: string;
  };
  scrollTracking?: boolean;
}

// CONTEXT
export interface StepperContextValue extends StepperProps {
  clickable?: boolean;
  isError?: boolean;
  isLoading?: boolean;
  isVertical?: boolean;
  stepCount?: number;
  expandVerticalSteps?: boolean;
  activeStep: number;
  initialStep: number;
}

export type StepperContextProviderProps = {
  value: Omit<StepperContextValue, "activeStep">;
  children: React.ReactNode;
};

// STEP ITEMS
export type StepItem = {
  id?: string;
  label?: string;
  description?: string;
  icon?: IconType;
  optional?: boolean;
};

// STEPPER PROPS
export interface StepperProps extends StepOptions {
  children?: React.ReactNode;
  className?: string;
  initialStep: number;
  steps: StepItem[];
}

// STEP PROPS
export interface StepProps extends React.HTMLAttributes<HTMLLIElement> {
  label?: string | React.ReactNode;
  description?: string;
  icon?: IconType;
  state?: "loading" | "error";
  checkIcon?: IconType;
  errorIcon?: IconType;
  isCompletedStep?: boolean;
  isKeepError?: boolean;
  onClickStep?: (step: number, setStep: (step: number) => void) => void;
}

// STEP SHARED PROPS
export interface StepSharedProps extends StepProps {
  isLastStep?: boolean;
  isCurrentStep?: boolean;
  index?: number;
  hasVisited: boolean | undefined;
  isError?: boolean;
  isLoading?: boolean;
}

// STEP INTERNAL CONFIG
export interface StepInternalConfig {
  index: number;
  isCompletedStep?: boolean;
  isCurrentStep?: boolean;
  isLastStep?: boolean;
}

// FULL STEP PROPS
export interface FullStepProps extends StepProps, StepInternalConfig {}

// VERTICAL STEP PROPS
export type VerticalStepProps = StepSharedProps & {
  children?: React.ReactNode;
};

// STEP BUTTON CONTAINER PROPS
export type StepButtonContainerProps = StepSharedProps & {
  children?: React.ReactNode;
};

// STEP LABEL PROPS
export interface StepLabelProps {
  isCurrentStep?: boolean;
  opacity: number;
  label?: string | React.ReactNode;
  description?: string | null;
}
