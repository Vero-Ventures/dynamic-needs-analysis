import Beneficiaries from "./(beneficiaries)/beneficiaries";
import { cn } from "@/lib/utils";
import GoalsAndPhilanthropy from "./(goals-and-philanthropy)/goals-and-philanthropy";
import Businesses from "./(businesses)/businesses";
import Assets from "./(asset)/assets";
import Debts from "./(debt)/debts";
import StepperContainer from "./steppper-container";
import Shareholders from "./(shareholders)/shareholders";
import KeyPeople from "./(key-person)/key-people";
import Client from "./(client)/client";
import { redirect } from "next/navigation";

export default function ClientStepper({
  clientId,
  currentStep,
}: {
  clientId: number;
  currentStep: number;
}) {
  if (currentStep === 8) {
    redirect(`/dashboard/client/${clientId}/income-replacement`);
  }
  return (
    <div>
      <div className="flex h-[calc(100dvh-72px-100px)] items-center justify-center">
        <div
          className={cn(
            { hidden: currentStep !== 0 },
            "mx-auto max-h-[calc(100dvh-72px-100px-100px)] w-full max-w-3xl overflow-y-auto"
          )}
        >
          <Client clientId={clientId} />
        </div>
        <div
          className={cn(
            { hidden: currentStep !== 1 },
            "mx-auto max-h-[calc(100dvh-72px-100px-100px)] w-full max-w-3xl overflow-y-auto"
          )}
        >
          <Beneficiaries clientId={clientId} />
        </div>
        <div
          className={cn(
            { hidden: currentStep !== 2 },
            "mx-auto max-h-[calc(100dvh-72px-100px-100px)] w-full max-w-3xl overflow-y-auto"
          )}
        >
          <Assets clientId={clientId} />
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
      </div>
      <StepperContainer currentStep={currentStep} />
    </div>
  );
}
