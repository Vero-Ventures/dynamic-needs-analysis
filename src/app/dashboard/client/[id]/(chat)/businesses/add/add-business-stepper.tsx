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
} from "@/lib/businesses/utils";
import { useState } from "react";
import type { Shareholder } from "@/app/data/db";

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
    appreciationRate: 0,
    ebitda: 0,
    valuation: 0,
    term: 0,
  });
  const [shareholders, setShareholders] = useState<Shareholder[]>([
    {
      id: 0,
      name: clientName,
      sharePercentage: 100,
      ebitdaContributionPercentage: 100,
      insuranceCoverage: 0,
    },
  ]);

  function onAddShareholder(shareholder: AddShareholderFormSchema) {
    setShareholders([
      ...shareholders,
      {
        id: shareholders.length,
        ...shareholder,
      },
    ]);
  }

  function onDeleteShareholder(id: number) {
    setShareholders(shareholders.filter((s) => s.id !== id));
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

  const totalShareholderTableData = [
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
  ];

  return (
    <div className="flex w-full flex-col gap-4">
      <Stepper orientation="vertical" initialStep={0} steps={steps}>
        <Step icon={Building2Icon} label="Add Business">
          <AddBusinessesForm business={business} setBusiness={setBusiness} />
        </Step>
        <Step icon={Users2Icon} label="Add Shareholders">
          <div className="my-4 space-y-6">
            <AddShareholderDialog onAddShareholder={onAddShareholder} />
            <ShareholderTable
              shareholders={shareholders}
              valuation={business.valuation}
              ebitda={business.ebitda}
              onDeleteShareholder={onDeleteShareholder}
            />
            <TotalShareholderTable data={totalShareholderTableData} />
          </div>
          <StepperFormActions />
        </Step>
      </Stepper>
    </div>
  );
}
