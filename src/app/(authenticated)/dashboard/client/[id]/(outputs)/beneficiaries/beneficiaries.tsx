import BeneficiariesTable from "./beneficiaries-table";
import DesiredBeneficiaryAllocationChart from "./desired-beneficiary-allocation-chart";
import RealBeneficiaryDistributionChart from "./real-beneficiary-distribution-chart";
import AssetValueDistributionChart from "./asset-value-distribution-chart";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { getAssetsWithBeneficiaries } from "@/data/assets";
import Heading from "@/components/heading";

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
    <div className="space-y-14">
      <BeneficiariesTable beneficiaries={beneficiaries} />
      <Heading variant="h2">Desired Beneficiary Allocation</Heading>
      <DesiredBeneficiaryAllocationChart beneficiaries={beneficiaries} />
      <Heading variant="h2">Real Beneficiary Distribution</Heading>
      <RealBeneficiaryDistributionChart assets={assets} />
      <Heading variant="h2">Asset Value Distribution</Heading>
      <AssetValueDistributionChart assets={assets} />
    </div>
  );
}
