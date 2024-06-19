"use client";

import type { StepItem } from "@/components/ui/stepper";
import { Step, Stepper, useStepper } from "@/components/ui/stepper";
import Beneficiaries from "./(beneficiaries)/beneficiaries";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import Assets from "./(asset)/assets";
import { KeyPersonForm } from "./(key-person)/key-person-form";
import GoalsAndPhilanthropy from "./(goals-and-philanthropy)/goals-and-philanthropy";
import { Loader2Icon } from "lucide-react";
import { ClientInfoForm } from "./(client)/client-info-form";
import Businesses from "./(businesses)/businesses";
import Debts from "./(debt)/debts";

const steps = [
  { label: "Client Info" },
  { label: "Beneficiaries" },
  { label: "Assets" },
  { label: "Debt" },
  { label: "Businesses" },
  { label: "Key Person" },
  { label: "Goals & Philanthropy" },
] satisfies StepItem[];

export default function EditClientStepper() {
  const [currentStep, setCurrentStep] = useState(0);
  return (
    <div className="h-[calc(100dvh-72px-100px)]">
      <div className="flex h-full w-full items-center">
        <div
          className={cn(
            { hidden: currentStep !== 0 },
            "mx-auto w-full max-w-3xl"
          )}
        >
          <ClientInfoForm />
        </div>
        <div
          className={cn(
            { hidden: currentStep !== 1 },
            "mx-auto w-full max-w-3xl"
          )}
        >
          <Beneficiaries />
        </div>
        <div
          className={cn(
            { hidden: currentStep !== 2 },
            "mx-auto w-full max-w-3xl"
          )}
        >
          <Assets />
        </div>
        <div
          className={cn(
            { hidden: currentStep !== 3 },
            "mx-auto w-full max-w-3xl"
          )}
        >
          <Debts />
        </div>
        <div
          className={cn(
            { hidden: currentStep !== 4 },
            "mx-auto w-full max-w-3xl"
          )}
        >
          <Businesses />
        </div>
        <div
          className={cn(
            { hidden: currentStep !== 5 },
            "mx-auto w-full max-w-3xl"
          )}
        >
          <KeyPersonForm />
        </div>
        <div
          className={cn(
            { hidden: currentStep !== 6 },
            "mx-auto w-full max-w-3xl"
          )}
        >
          <GoalsAndPhilanthropy />
        </div>
        <div
          className={cn(
            { hidden: currentStep !== 7 },
            "mx-auto w-full max-w-3xl"
          )}
        >
          <FinishedScreen />
        </div>
      </div>

      <div className="flex items-center gap-4 bg-secondary p-4 text-secondary-foreground">
        <Stepper
          variant="circle-alt"
          initialStep={0}
          steps={steps}
          onClickStep={(step, setStep) => {
            setStep(step);
            setCurrentStep(step);
          }}
          styles={{
            "step-button-container": cn(
              "data-[current=true]:bg-yellow-500 data-[current=true]:border-secondary data-[current=true]:hover:text-secondary-foreground data-[current=true]:hover:bg-primary/90",
              "data-[active=true]:bg-yellow-500 data-[active=true]:border-yellow-500"
            ),
            "horizontal-step":
              "data-[completed=true]:[&:not(:last-child)]:after:bg-gray-500",
          }}
        >
          {steps.map(({ label }) => {
            return <Step key={label} label={label} />;
          })}
          <StepperActions onSetCurrentStep={setCurrentStep} />
        </Stepper>
      </div>
    </div>
  );
}

function StepperActions({
  onSetCurrentStep,
}: {
  onSetCurrentStep: Dispatch<SetStateAction<number>>;
}) {
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
      <div className="flex items-center gap-2 p-4">
        {hasCompletedAllSteps ? (
          <Button
            size="sm"
            className="border border-secondary"
            onClick={() => {
              resetSteps();
              onSetCurrentStep(0);
            }}
          >
            Reset
          </Button>
        ) : (
          <>
            <Button
              disabled={isDisabledStep}
              variant="outline"
              className="text-secondary"
              onClick={() => {
                prevStep();
                onSetCurrentStep((s) => s - 1);
              }}
              size="sm"
            >
              Prev
            </Button>
            <Button
              size="sm"
              onClick={() => {
                nextStep();
                onSetCurrentStep((s) => s + 1);
              }}
            >
              {isLastStep ? "Finish" : isOptionalStep ? "Skip" : "Next"}
            </Button>
          </>
        )}
      </div>
    </>
  );
}

function FinishedScreen() {
  return (
    <div className="flex w-full items-center justify-center gap-4 text-3xl font-bold">
      <Loader2Icon className="h-9 w-9 animate-spin" />
      <span>Submitting Form...</span>
    </div>
  );
}
