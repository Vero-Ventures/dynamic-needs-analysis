"use client";

import { SquarePenIcon } from "lucide-react";

import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { EditAssetForm } from "./edit-asset-form";
import type { SingleAssetWithBeneficiaries } from "@/data/assets";
import type { Beneficiary } from "@/types/db";

export default function EditAssetDialog({
  editAsset,
  beneficiaries,
}: {
  editAsset: SingleAssetWithBeneficiaries;
  beneficiaries: Omit<Beneficiary, "created_at" | "client_id">[];
}) {
  const { asset_beneficiaries, ...asset } = editAsset;
  const [open, setOpen] = useState(false);
  function handleCloseDialog() {
    setOpen(false);
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <SquarePenIcon className="h-6 w-6 hover:cursor-pointer" />
      </DialogTrigger>
      <EditAssetForm
        asset={asset}
        beneficiaries={beneficiaries}
        editAssetBeneficiaries={asset_beneficiaries}
        onCloseDialog={handleCloseDialog}
      />
    </Dialog>
  );
}
