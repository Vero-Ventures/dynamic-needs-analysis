import { beneficiaries } from "@/app/data/db";
import AddAssetsStepper from "./add-assets-stepper";

export default async function AddAssetsPage() {
  // make a copy of the beneficiaries
  const assetBeneficiaries = beneficiaries.map((b) => ({
    ...b,
    isAssetAssigned: true,
  }));

  return (
    <div className="space-y-6 p-4">
      <AddAssetsStepper assetBeneficiaries={assetBeneficiaries} />
    </div>
  );
}
