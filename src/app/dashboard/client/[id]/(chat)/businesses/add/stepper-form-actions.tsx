"use client";
import { Button } from "@/components/ui/button";
import { useStepper } from "@/components/ui/stepper/use-stepper";
import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";

export function StepperFormActions({
  onSubmitBusiness,
}: {
  onSubmitBusiness?: () => Promise<void>;
}) {
  const {
    prevStep,
    nextStep,
    isDisabledStep,
    hasCompletedAllSteps,
    isLastStep,
  } = useStepper();
  const router = useRouter();

  if (hasCompletedAllSteps) {
    onSubmitBusiness?.();
    router.replace("/dashboard/client/1/businesses");
  }

  return (
    <div className="flex w-full justify-end gap-2">
      {hasCompletedAllSteps ? (
        <Button disabled size="sm" type="button">
          <div>
            <Loader2Icon className="animate-spin" />
            <span>Loading...</span>
          </div>
        </Button>
      ) : (
        <>
          <Button
            onClick={() => router.replace("/dashboard/client/1/businesses")}
            size="sm"
            variant="secondary"
            type="button"
          >
            Cancel
          </Button>
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
