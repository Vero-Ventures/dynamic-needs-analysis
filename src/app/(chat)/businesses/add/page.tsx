"use client";

// import AddBusinessesForm from "./add-businesses-form";
// import AddShareholderDialog from "./add-shareholder-dialog";
// import { ShareholderTable } from "./shareholder-table";

export default function AddBusinessesPage() {
  return (
    <div className="space-y-6 p-4">
      <AddBusinessStepper />
      {/* <h2 className="text-2xl font-bold">Add New Business</h2>
      <AddBusinessesForm />
      <section>
        <h2 className="text-2xl font-bold">Shareholders</h2>
        <AddShareholderDialog />
        <div className="mt-4">
          <ShareholderTable />
        </div>
      </section> */}
    </div>
  );
}

import { Step, Stepper, type StepItem } from "@/components/ui/stepper";
import { Building2Icon, Users2Icon } from "lucide-react";
import AddShareholderDialog from "./add-shareholder-dialog";
import AddBusinessesForm from "./add-businesses-form";
import { ShareholderTable } from "./shareholder-table";
import { StepperFormActions } from "./stepper-form-actions";

const steps = [
  { label: "Add Business" },
  { label: "Add Shareholders" },
] satisfies StepItem[];

function AddBusinessStepper() {
  return (
    <div className="flex w-full flex-col gap-4">
      <Stepper orientation="vertical" initialStep={0} steps={steps}>
        <Step icon={Building2Icon} label="Add Business">
          <AddBusinessesForm />
        </Step>
        <Step icon={Users2Icon} label="Add Shareholders">
          <div className="my-4">
            <AddShareholderDialog />
            <ShareholderTable />
          </div>
          <StepperFormActions />
        </Step>
      </Stepper>
    </div>
  );
}
