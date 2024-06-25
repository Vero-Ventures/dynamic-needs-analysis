import BeneficiariesTable from "./beneficiaries-table";
import DesiredBeneficiaryAllocationChart from "./desired-beneficiary-allocation-chart";
import RealBeneficiaryDistributionChart from "./real-beneficiary-distribution-chart";
import AssetValueDistributionChart from "./asset-value-distribution-chart";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { getAssetsWithBeneficiaries } from "@/data/assets";

export default async function Beneficiaries({
  clientId,
}: {
  clientId: number;
}) {
  const sb = await createClient();
  const { data: beneficiaries } = await sb.from("beneficiaries").select();
  const assets = await getAssetsWithBeneficiaries(clientId);
  if (!beneficiaries || !assets) {
    notFound();
  }

  return (
    <section className="space-y-14 p-4">
      <BeneficiariesTable beneficiaries={beneficiaries} />
      <DesiredBeneficiaryAllocationChart beneficiaries={beneficiaries} />
      <RealBeneficiaryDistributionChart assets={assets} />
      <AssetValueDistributionChart assets={assets} />
    </section>
  );
}
