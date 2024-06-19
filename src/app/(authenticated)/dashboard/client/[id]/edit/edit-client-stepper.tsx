"use client";

import { Button } from "@/components/ui/button";
import {
  Step,
  Stepper,
  useStepper,
  type StepItem,
} from "@/components/ui/stepper";

const steps = [
  { label: "Beneficiaries" },
  { label: "Assets" },
  { label: "Income Replacement" },
  { label: "Debt" },
  { label: "Shareholders Agreement" },
  { label: "Key Person" },
  { label: "Goals & Philanthropy" },
] satisfies StepItem[];

export default function EditClientStepper() {
  return (
    <div className="flex w-full flex-col gap-4">
      <Stepper initialStep={0} steps={steps}>
        {steps.map(({ label }, index) => {
          return (
            <Step key={label} label={label}>
              <div className="my-4 flex h-40 items-center justify-center rounded-md border bg-secondary text-primary">
                <h1 className="text-xl">Step {index + 1}</h1>
              </div>
            </Step>
          );
        })}
        <StepperFormActions />
      </Stepper>
    </div>
  );
}

const StepperFormActions = () => {
  const {
    nextStep,
    prevStep,
    resetSteps,
    isDisabledStep,
    hasCompletedAllSteps,
    isLastStep,
    isOptionalStep,
  } = useStepper();

  return (
    <>
      {hasCompletedAllSteps && (
        <div className="my-4 flex h-40 items-center justify-center rounded-md border bg-secondary text-primary">
          <h1 className="text-xl">Woohoo! All steps completed! 🎉</h1>
        </div>
      )}
      <div className="flex w-full justify-end gap-2">
        {hasCompletedAllSteps ? (
          <Button size="sm" onClick={resetSteps}>
            Reset
          </Button>
        ) : (
          <>
            <Button
              disabled={isDisabledStep}
              onClick={prevStep}
              size="sm"
              variant="secondary"
            >
              Prev
            </Button>
            <Button size="sm" onClick={nextStep}>
              {isLastStep ? "Finish" : isOptionalStep ? "Skip" : "Next"}
            </Button>
          </>
        )}
      </div>
    </>
  );
};
