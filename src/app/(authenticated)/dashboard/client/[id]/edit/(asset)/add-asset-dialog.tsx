"use client";

import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import type { AddAssetFormSchema } from "./add-asset-form";
import { AddAssetForm } from "./add-asset-form";
import type { AssetBeneficiary } from "./beneficiary-allocation";
import type { BeneficiarySchema } from "../(beneficiaries)/beneficiaries";

export default function AddAssetDialog({
  beneficiaries,
  onAddAssetWithBeneficiaries,
}: {
  beneficiaries: BeneficiarySchema[];
  onAddAssetWithBeneficiaries: (
    asset: AddAssetFormSchema,
    beneficiaries: AssetBeneficiary[]
  ) => void;
}) {
  const [open, setOpen] = useState(false);
  function handleCloseDialog() {
    setOpen(false);
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="my-4 space-x-1 rounded-full border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-foreground"
          variant="outline"
        >
          <PlusIcon className="h-5 w-5" />
          <span>Add Asset</span>
        </Button>
      </DialogTrigger>
      <AddAssetForm
        beneficiaries={beneficiaries}
        onCloseDialog={handleCloseDialog}
        onAddAssetWithBeneficiaries={onAddAssetWithBeneficiaries}
      />
    </Dialog>
  );
}
