"use client";

import { useState } from "react";
import { Step, Stepper, type StepItem } from "@/components/ui/stepper";
import { LandmarkIcon, Users2Icon } from "lucide-react";
import type { AddAssetsFormSchema } from "./add-assets-form";
import AddAssetsForm from "./add-assets-form";
import type { Beneficiary } from "@/app/data/db";
import { BeneficiaryTable } from "./beneficiary-table";
import { StepperFormActions } from "./stepper-form-actions";
import { addAsset } from "../actions";

const steps = [
  { label: "Add Asset" },
  { label: "Add Beneficiaries" },
] satisfies StepItem[];

export interface AssetBeneficiary extends Beneficiary {
  isAssetAssigned: boolean;
}
export default function AddAssetStepper({
  assetBeneficiaries,
}: {
  assetBeneficiaries: AssetBeneficiary[];
}) {
  const [asset, setAsset] = useState<AddAssetsFormSchema>({
    name: "",
    initialValue: 0,
    currentValue: 0,
    yearAcquired: 0,
    rate: 0,
    term: 0,
    type: "Cash",
    isTaxable: false,
    isLiquid: false,
    isToBeSold: false,
  });
  console.log(asset);
  const [beneficiaries, setBeneficiaries] =
    useState<AssetBeneficiary[]>(assetBeneficiaries);

  async function handleSubmitAsset() {
    await addAsset(asset, beneficiaries);
  }

  function handleAddAsset(values: AddAssetsFormSchema) {
    setAsset({ ...asset, ...values });
  }

  function onEditBeneficiary(updatedBeneficiary: AssetBeneficiary) {
    setBeneficiaries(
      beneficiaries.map((b) =>
        b.id === updatedBeneficiary.id ? updatedBeneficiary : b
      )
    );
  }

  function onToggleBeneficiary(id: number, isAssetAssigned: boolean) {
    setBeneficiaries(
      beneficiaries.map((b) => {
        if (b.id === id) {
          return { ...b, isAssetAssigned };
        }
        return b;
      })
    );
  }

  return (
    <div className="flex w-full flex-col gap-4">
      <Stepper orientation="vertical" initialStep={0} steps={steps}>
        <Step icon={LandmarkIcon} label="Add Asset">
          <AddAssetsForm asset={asset} onAddAsset={handleAddAsset} />
        </Step>
        <Step icon={Users2Icon} label="Assign Beneficiaries">
          <div className="mb-10 mt-4 space-y-6">
            <BeneficiaryTable
              assetBeneficiaries={beneficiaries}
              onEditBeneficiary={onEditBeneficiary}
              onToggleBeneficiary={onToggleBeneficiary}
            />
          </div>
          <StepperFormActions onSubmitAsset={handleSubmitAsset} />
        </Step>
      </Stepper>
    </div>
  );
}
