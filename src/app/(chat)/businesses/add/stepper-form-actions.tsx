"use client";
import { Button } from "@/components/ui/button";
import { useStepper } from "@/components/ui/stepper/use-stepper";
import { useRouter } from "next/navigation";

export function StepperFormActions() {
  const {
    prevStep,
    resetSteps,
    nextStep,
    isDisabledStep,
    hasCompletedAllSteps,
    isLastStep,
  } = useStepper();
  const router = useRouter();

  if (hasCompletedAllSteps) {
    router.replace("/businesses");
  }

  return (
    <div className="flex w-full justify-end gap-2">
      {hasCompletedAllSteps ? (
        <Button size="sm" type="button" onClick={resetSteps}>
          Reset
        </Button>
      ) : (
        <>
          <Button
            disabled={isDisabledStep}
            onClick={prevStep}
            size="sm"
            variant="secondary"
            type="button"
          >
            Prev
          </Button>
          <Button
            size="sm"
            type="submit"
            onClick={() => {
              if (isLastStep) {
                nextStep();
              }
            }}
          >
            {isLastStep ? "Save Changes" : "Next"}
          </Button>
        </>
      )}
    </div>
  );
}
