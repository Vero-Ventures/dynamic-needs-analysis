"use client";
import type { StepItem } from "@/components/ui/stepper";
import { Step, Stepper } from "@/components/ui/stepper";
import StepperActions from "./stepper-actions";
import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

const steps = [
  { label: "Beneficiaries" },
  { label: "Assets" },
  { label: "Debt" },
  { label: "Businesses" },
  { label: "Shareholders" },
  { label: "Key Person" },
  { label: "Goals & Philanthropy" },
] satisfies StepItem[];

export default function StepperContainer({
  currentStep,
}: {
  currentStep: number;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );
  return (
    <div className="flex items-center gap-4 bg-secondary p-4 text-secondary-foreground">
      <Stepper
        variant="circle-alt"
        initialStep={currentStep}
        steps={steps}
        onClickStep={(step, setStep) => {
          router.push(
            pathname + "?" + createQueryString("step", step.toString())
          );
          setStep(step);
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
        <StepperActions currentStep={currentStep} />
      </Stepper>
    </div>
  );
}
