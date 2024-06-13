"use client";

import { useState } from "react";
import { Step, Stepper, type StepItem } from "@/components/ui/stepper";
import { LandmarkIcon, Users2Icon } from "lucide-react";
import type { Asset } from "@/app/data/db";
import type { AddAssetsFormSchema } from "../../add/add-assets-form";
import AddAssetsForm from "../../add/add-assets-form";
import { BeneficiaryTable } from "../../add/beneficiary-table";
import { StepperFormActions } from "../../add/stepper-form-actions";
import type { AssetBeneficiary } from "../../add/add-assets-stepper";
import { editAsset } from "../../actions";

const steps = [
  { label: "Edit Asset" },
  { label: "Edit Beneficiaries" },
] satisfies StepItem[];

export default function EditAssetStepper({ asset }: { asset: Asset }) {
  const [updatedAsset, setUpdatedAsset] = useState<AddAssetsFormSchema>({
    name: asset.name,
    initialValue: asset.initialValue,
    currentValue: asset.currentValue,
    yearAcquired: asset.yearAcquired,
    rate: asset.rate,
    term: asset.term,
    type: asset.type,
    isTaxable: asset.isTaxable,
    isLiquid: asset.isLiquid,
    isToBeSold: asset.isToBeSold,
  });
  const [beneficiaries, setBeneficiaries] = useState<AssetBeneficiary[]>(
    asset.assetBeneficiaries
  );

  async function handleSubmitAsset() {
    await editAsset(asset.id, updatedAsset, beneficiaries);
  }

  function handleEditAsset(values: AddAssetsFormSchema) {
    setUpdatedAsset({ ...updatedAsset, ...values });
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
        <Step icon={LandmarkIcon} label="Edit Asset">
          <AddAssetsForm asset={asset} onAddAsset={handleEditAsset} />
        </Step>
        <Step icon={Users2Icon} label="Edit Beneficiaries">
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
