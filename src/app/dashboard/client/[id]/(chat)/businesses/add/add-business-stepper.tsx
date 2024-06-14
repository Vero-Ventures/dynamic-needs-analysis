"use client";

import { Step, Stepper, type StepItem } from "@/components/ui/stepper";
import { Building2Icon, Users2Icon } from "lucide-react";
import type { AddShareholderFormSchema } from "./add-shareholder-dialog";
import AddShareholderDialog from "./add-shareholder-dialog";
import type { AddBusinessesFormSchema } from "./add-businesses-form";
import AddBusinessesForm from "./add-businesses-form";
import { ShareholderTable, TotalShareholderTable } from "./shareholder-table";
import { StepperFormActions } from "./stepper-form-actions";
import { formatMoney } from "@/lib/utils";
import {
  calculateTotalEbitdaContributionPercentage,
  calculateTotalMajorShareholderDisparity,
  calculateTotalMajorShareholderInsurance,
  calculateTotalMajorShareholderValue,
  calculateTotalShareholderPercentageOwned,
  generateRandomShareholderId,
} from "@/lib/businesses/utils";
import { useState } from "react";
import { addBusiness } from "./actions";
import type { EditShareholder } from "./types";

const steps = [
  { label: "Add Business" },
  { label: "Add Shareholders" },
] satisfies StepItem[];

export default function AddBusinessStepper({
  clientName,
}: {
  clientName: string;
}) {
  const [business, setBusiness] = useState<AddBusinessesFormSchema>({
    name: "",
    appreciation_rate: 0,
    ebitda: 0,
    valuation: 0,
    term: 0,
  });
  const [shareholders, setShareholders] = useState<EditShareholder[]>([
    {
      id: generateRandomShareholderId(),
      name: clientName,
      share_percentage: 100,
      ebitda_contribution_percentage: 100,
      insurance_coverage: 0,
      created_at: new Date().toISOString(),
    },
  ]);

  async function handleAddBusiness() {
    await addBusiness(business, shareholders);
  }

  function handleSubmitBusiness(values: AddBusinessesFormSchema) {
    setBusiness({ ...business, ...values });
  }

  function onAddShareholder(shareholder: AddShareholderFormSchema) {
    setShareholders([
      ...shareholders,
      {
        ...shareholder,
        id: generateRandomShareholderId(),
        created_at: new Date().toISOString(),
      },
    ]);
  }

  function onDeleteShareholder(id: number) {
    setShareholders(shareholders.filter((s) => s.id !== id));
  }
  function onEditShareholder(updatedShareholder: EditShareholder) {
    setShareholders(
      shareholders.map((s) =>
        s.id === updatedShareholder.id ? updatedShareholder : s
      )
    );
  }
  const totalShareholderPercentageOwned =
    calculateTotalShareholderPercentageOwned(shareholders);

  const totalEbitdaContributionPercentage =
    calculateTotalEbitdaContributionPercentage(shareholders);

  const totalMajorShareholderValue = calculateTotalMajorShareholderValue(
    shareholders,
    business.valuation
  );

  const totalMajorShareholderInsurance =
    calculateTotalMajorShareholderInsurance(shareholders);

  const totalMajorShareholderDisparity =
    calculateTotalMajorShareholderDisparity(
      totalMajorShareholderValue,
      totalMajorShareholderInsurance
    );

  return (
    <div className="flex w-full flex-col gap-4">
      <Stepper orientation="vertical" initialStep={0} steps={steps}>
        <Step icon={Building2Icon} label="Add Business">
          <AddBusinessesForm
            business={business}
            onAddBusiness={handleSubmitBusiness}
          />
        </Step>
        <Step icon={Users2Icon} label="Add Shareholders">
          <div className="my-4 space-y-6">
            <AddShareholderDialog onAddShareholder={onAddShareholder} />
            <ShareholderTable
              shareholders={shareholders}
              valuation={business.valuation}
              ebitda={business.ebitda}
              onEditShareholder={onEditShareholder}
              onDeleteShareholder={onDeleteShareholder}
            />
            <TotalShareholderTable
              data={[
                {
                  label: "Total Shareholder Percentage Owned (%)",
                  totalAmount: `${totalShareholderPercentageOwned}%`,
                },
                {
                  label: "Total EBITDA Contribution (%)",
                  totalAmount: `${totalEbitdaContributionPercentage}%`,
                },
                {
                  label: "Total Major Shareholder Value ($)",
                  totalAmount: formatMoney(totalMajorShareholderValue),
                },
                {
                  label: "Total Major Shareholder Insurance ($)",
                  totalAmount: formatMoney(totalMajorShareholderInsurance),
                },
                {
                  label: "Total Major Shareholder Disparity ($)",
                  totalAmount: formatMoney(totalMajorShareholderDisparity),
                },
              ]}
            />
          </div>
          <StepperFormActions onSubmitBusiness={handleAddBusiness} />
        </Step>
      </Stepper>
    </div>
  );
}
