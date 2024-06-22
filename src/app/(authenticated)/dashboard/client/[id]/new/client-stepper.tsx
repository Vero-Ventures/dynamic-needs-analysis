import Beneficiaries from "./(beneficiaries)/beneficiaries";
import { cn } from "@/lib/utils";
import GoalsAndPhilanthropy from "./(goals-and-philanthropy)/goals-and-philanthropy";
import { Loader2Icon } from "lucide-react";
import Businesses from "./(businesses)/businesses";
import Debts from "./(debt)/debts";
import StepperContainer from "./steppper-container";
import Shareholders from "./(shareholders)/shareholders";
import KeyPeople from "./(key-person)/key-people";
import Assets from "./(asset)/assets";
import AssetBeneficiaries from "./(asset-beneficiary)/asset-beneficiaries";

export default function ClientStepper({
  clientId,
  currentStep,
}: {
  clientId: number;
  currentStep: number;
}) {
  return (
    <div>
      <div className="flex h-[calc(100dvh-72px-100px)] items-center justify-center">
        <div
          className={cn(
            { hidden: currentStep !== 0 },
            "mx-auto max-h-[calc(100dvh-72px-100px-100px)] w-full max-w-3xl overflow-y-auto"
          )}
        >
          <Beneficiaries clientId={clientId} />
        </div>
        <div
          className={cn(
            { hidden: currentStep !== 1 },
            "mx-auto max-h-[calc(100dvh-72px-100px-100px)] w-full max-w-3xl overflow-y-auto"
          )}
        >
          <Assets clientId={clientId} />
        </div>
        <div
          className={cn(
            { hidden: currentStep !== 2 },
            "mx-auto max-h-[calc(100dvh-72px-100px-100px)] w-full max-w-3xl overflow-y-auto"
          )}
        >
          <AssetBeneficiaries clientId={clientId} />
        </div>
        <div
          className={cn(
            { hidden: currentStep !== 3 },
            "mx-auto max-h-[calc(100dvh-72px-100px-100px)] w-full max-w-3xl overflow-y-auto"
          )}
        >
          <Debts clientId={clientId} />
        </div>
        <div
          className={cn(
            { hidden: currentStep !== 4 },
            "mx-auto max-h-[calc(100dvh-72px-100px-100px)] w-full max-w-3xl overflow-y-auto"
          )}
        >
          <Businesses clientId={clientId} />
        </div>
        <div
          className={cn(
            { hidden: currentStep !== 5 },
            "mx-auto max-h-[calc(100dvh-72px-100px-100px)] w-full max-w-3xl overflow-y-auto"
          )}
        >
          <Shareholders clientId={clientId} />
        </div>
        <div
          className={cn(
            { hidden: currentStep !== 6 },
            "mx-auto max-h-[calc(100dvh-72px-100px-100px)] w-full max-w-3xl overflow-y-auto"
          )}
        >
          <KeyPeople clientId={clientId} />
        </div>
        <div
          className={cn(
            { hidden: currentStep !== 7 },
            "mx-auto max-h-[calc(100dvh-72px-100px-100px)] w-full max-w-3xl overflow-y-auto"
          )}
        >
          <GoalsAndPhilanthropy clientId={clientId} />
        </div>
        <div
          className={cn(
            { hidden: currentStep !== 8 },
            "mx-auto max-h-[calc(100dvh-72px-100px-100px)] w-full max-w-3xl"
          )}
        >
          <FinishedScreen />
        </div>
      </div>
      <StepperContainer currentStep={currentStep} />
    </div>
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
