import { assets } from "@/app/data/db";
import EditAssetStepper from "./edit-asset-stepper";
import { notFound } from "next/navigation";

export default function EditAssetPage({
  params,
}: {
  params: { assetId: string };
}) {
  const asset = assets.at(+params.assetId);
  if (!asset) {
    notFound();
  }

  return (
    <div className="space-y-6 p-4">
      <EditAssetStepper asset={asset} />
    </div>
  );
}
