"use client";

import { Button } from "@/components/ui/button";
import { useStepper } from "@/components/ui/stepper";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export default function StepperActions({
  currentStep,
}: {
  currentStep: number;
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
    <>
      <div className="flex items-center gap-2 p-4">
        {hasCompletedAllSteps ? (
          <Button
            size="sm"
            className="border border-secondary"
            onClick={() => {
              resetSteps();
              router.push(pathname + "?" + createQueryString("step", "0"));
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
                router.push(
                  pathname +
                    "?" +
                    createQueryString("step", (currentStep - 1).toString())
                );
              }}
              size="sm"
            >
              Prev
            </Button>
            <Button
              size="sm"
              onClick={() => {
                nextStep();
                router.push(
                  pathname +
                    "?" +
                    createQueryString("step", (currentStep + 1).toString())
                );
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
