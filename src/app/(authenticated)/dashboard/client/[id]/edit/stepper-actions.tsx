"use client";

import { Button } from "@/components/ui/button";
import { useStepper } from "@/components/ui/stepper";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useCallback } from "react";

export default function StepperActions({
  currentStep,
}: {
  currentStep: number;
}) {
  const {
    nextStep,
    prevStep,
    isDisabledStep,
    hasCompletedAllSteps,
    isLastStep,
    isOptionalStep,
  } = useStepper();
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams<{ id: string }>();
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
        {!hasCompletedAllSteps && (
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
                if (isLastStep) {
                  return router.push(
                    `/dashboard/client/${params.id}/income-replacement`
                  );
                }
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
