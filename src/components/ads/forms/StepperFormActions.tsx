import { Button } from "@/components/ui/button";
import { useStepper } from "@/hooks/useStepper";
import { IAttribute } from "@/types/category.interface";
import { useFormContext } from "react-hook-form";

function StepperFormActions({ attrGroup }: { attrGroup: IAttribute[] }) {
  const { trigger, formState } = useFormContext();
  const { nextStep, isLastStep } = useStepper();

  const validateAndNext = async () => {
    const isValid = await trigger(attrGroup.map((attr) => attr.name));

    if (isValid) {
      nextStep();
    }
  };

  if (!isLastStep)
    return (
      <Button
        className="h-12 w-full bg-fuchsia-500 disabled:bg-gray-500 disabled:opacity-100"
        onClick={validateAndNext}
        size="sm"
      >
        Далее
      </Button>
    );
  return (
    <Button
      disabled={formState.isSubmitting}
      className="h-12 w-full bg-fuchsia-500"
      type="submit"
      size="sm"
    >
      Опубликовать
    </Button>
  );
}

export default StepperFormActions;
