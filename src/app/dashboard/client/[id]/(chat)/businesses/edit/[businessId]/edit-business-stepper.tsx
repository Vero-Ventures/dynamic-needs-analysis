"use client";

import { Step, Stepper, type StepItem } from "@/components/ui/stepper";
import { Building2Icon, Users2Icon } from "lucide-react";

import { formatMoney } from "@/lib/utils";
import {
  calculateTotalEbitdaContributionPercentage,
  calculateTotalMajorShareholderDisparity,
  calculateTotalMajorShareholderInsurance,
  calculateTotalMajorShareholderValue,
  calculateTotalShareholderPercentageOwned,
} from "@/lib/businesses/utils";
import { useState } from "react";
import type { Business, Shareholder } from "@/app/data/db";
import type { AddShareholderFormSchema } from "../../add/add-shareholder-dialog";
import type { AddBusinessesFormSchema } from "../../add/add-businesses-form";
import { editBusiness } from "./actions";
import AddBusinessesForm from "../../add/add-businesses-form";
import AddShareholderDialog from "../../add/add-shareholder-dialog";
import {
  ShareholderTable,
  TotalShareholderTable,
} from "../../add/shareholder-table";
import { StepperFormActions } from "../../add/stepper-form-actions";

const steps = [
  { label: "Edit Business" },
  { label: "Edit Shareholders" },
] satisfies StepItem[];

export default function EditBusinessStepper({
  business,
}: {
  business: Business;
}) {
  const [updatedBusiness, setUpdatedBusiness] =
    useState<AddBusinessesFormSchema>({
      name: business.name,
      valuation: business.valuation,
      ebitda: business.ebitda,
      appreciationRate: business.appreciationRate,
      term: business.term,
    });
  const [shareholders, setShareholders] = useState<Shareholder[]>(
    business.shareholders
  );

  async function handleEditBusiness() {
    await editBusiness(business.id, updatedBusiness, shareholders);
  }

  function handleSubmitBusiness(values: AddBusinessesFormSchema) {
    setUpdatedBusiness({ ...updatedBusiness, ...values });
  }

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
  function onEditShareholder(updatedShareholder: Shareholder) {
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
    updatedBusiness.valuation
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
            business={updatedBusiness}
            onAddBusiness={handleSubmitBusiness}
          />
        </Step>
        <Step icon={Users2Icon} label="Add Shareholders">
          <div className="my-4 space-y-6">
            <AddShareholderDialog onAddShareholder={onAddShareholder} />
            <ShareholderTable
              shareholders={shareholders}
              valuation={updatedBusiness.valuation}
              ebitda={updatedBusiness.ebitda}
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
          <StepperFormActions onSubmitBusiness={handleEditBusiness} />
        </Step>
      </Stepper>
    </div>
  );
}
