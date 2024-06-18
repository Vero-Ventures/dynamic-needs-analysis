import AddAssetStepper from "./add-assets-stepper";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";

export default async function AddAssetsPage() {
  const sb = createClient();
  const { data: beneficiaries } = await sb
    .from("beneficiaries")
    .select("id, name, allocation");
  if (!beneficiaries) {
    notFound();
  }

  const assetBeneficiaries = beneficiaries.map((b) => ({
    ...b,
    isAssetAssigned: true,
  }));

  return (
    <div className="space-y-6 p-4">
      <AddAssetStepper assetBeneficiaries={assetBeneficiaries} />
    </div>
  );
}
