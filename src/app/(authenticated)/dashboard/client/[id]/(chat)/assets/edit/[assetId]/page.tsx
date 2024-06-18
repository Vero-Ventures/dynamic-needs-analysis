import EditAssetStepper from "./edit-asset-stepper";
import { notFound } from "next/navigation";
import { getSingleAssetWithBeneficiaries } from "@/data/assets";

export default async function EditAssetPage({
  params,
}: {
  params: { assetId: string };
}) {
  const asset = await getSingleAssetWithBeneficiaries(+params.assetId);
  if (!asset) {
    notFound();
  }

  return (
    <div className="space-y-6 p-4">
      <EditAssetStepper asset={asset} />
    </div>
  );
}
