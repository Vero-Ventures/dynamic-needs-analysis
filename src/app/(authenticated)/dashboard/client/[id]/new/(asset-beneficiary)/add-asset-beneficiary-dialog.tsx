"use client";

import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { AddAssetBeneficiaryForm } from "./add-asset-beneficiary-form";
import type { AssetsWithBeneficiaries } from "@/data/assets";
import type { Beneficiary } from "@/types/db";

export default function AddAssetBeneficiaryDialog({
  assets,
  beneficiaries,
}: {
  assets: AssetsWithBeneficiaries;
  beneficiaries: Beneficiary[];
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
          <span>Allocate Beneficiary</span>
        </Button>
      </DialogTrigger>
      <AddAssetBeneficiaryForm
        assets={assets}
        beneficiaries={beneficiaries}
        onCloseDialog={handleCloseDialog}
      />
    </Dialog>
  );
}
