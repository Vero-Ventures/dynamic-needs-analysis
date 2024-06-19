"use client";

import type { StepItem } from "@/components/ui/stepper";
import { Step, Stepper, useStepper } from "@/components/ui/stepper";
import Beneficiaries from "./(beneficiaries)/beneficiaries";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import Assets from "./(asset)/assets";
import { DebtForm } from "./(debt)/debt-form";
import { IncomeReplacementForm } from "./(client)/income-replacement-form";
import Shareholders from "./(shareholders)/shareholders";
import { KeyPersonForm } from "./(key-person)/key-person-form";
import GoalsAndPhilanthropy from "./(goals-and-philanthropy)/goals-and-philanthropy";
import { Loader2Icon } from "lucide-react";

const steps = [
  { label: "Beneficiaries" },
  { label: "Assets" },
  { label: "Income Replacement" },
  { label: "Debt" },
  { label: "Shareholders Agreement" },
  { label: "Key Person" },
  { label: "Goals & Philanthropy" },
] satisfies StepItem[];

const forms = [
  <Beneficiaries key={0} />,
  <Assets key={1} />,
  <IncomeReplacementForm key={2} />,
  <DebtForm key={3} />,
  <Shareholders key={4} />,
  <KeyPersonForm key={5} />,
  <GoalsAndPhilanthropy key={6} />,
  <FinishedScreen key={7} />,
];

export default function EditClientStepper() {
  const [currentStep, setCurrentStep] = useState(0);
  return (
    <div className="h-[calc(100dvh-72px-100px)]">
      {forms.map((element, i) => (
        <div
          key={i}
          className={cn("flex h-full items-center", {
            hidden: currentStep !== i,
          })}
        >
          {element}
        </div>
      ))}

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
