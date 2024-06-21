"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AssetsTable from "./assets-table";
import AddAssetDialog from "./add-asset-dialog";
import { useState } from "react";
import type { AssetBeneficiary } from "./beneficiary-allocation";
import type { AddAssetFormSchema } from "./add-asset-form";

export interface AssetWithBeneficiaries {
  id: number;
  name: string;
  year_acquired: number;
  purchase_price: number;
  current_value: number;
  beneficiaries: AssetBeneficiary[];
}
export default function Assets() {
  const [assetWithBeneficiaries, setAssetWithBeneficiaries] = useState<
    AssetWithBeneficiaries[]
  >([]);

  function handleAddAssetWithBeneficiaries(
    asset: AddAssetFormSchema,
    beneficiaries: AssetBeneficiary[]
  ) {
    setAssetWithBeneficiaries([
      ...assetWithBeneficiaries,
      {
        id: assetWithBeneficiaries.length,
        ...asset,
        beneficiaries,
      },
    ]);
  }

  function handleDeleteAssetWithBeneficiaries(id: number) {
    setAssetWithBeneficiaries(
      assetWithBeneficiaries.filter((asset) => asset.id !== id)
    );
  }

  return (
    <Card className="border-none">
      <CardHeader>
        <CardTitle className="mt-3 text-center text-4xl font-bold">
          Assets
        </CardTitle>
      </CardHeader>
      <CardContent>
        <AssetsTable
          assets={assetWithBeneficiaries}
          onDeleteAssetWithBeneficiaries={handleDeleteAssetWithBeneficiaries}
        />
      </CardContent>
      <CardFooter>
        <AddAssetDialog
          beneficiaries={[]}
          onAddAssetWithBeneficiaries={handleAddAssetWithBeneficiaries}
        />
      </CardFooter>
    </Card>
  );
}
