import BeneficiariesTable from "./beneficiaries-table";

import AddBeneficiaryDialog from "./add-beneficiary-dialog";
import DesiredBeneficiaryAllocationChart from "./desired-beneficiary-distribution-chart";
import RealBeneficiaryDistributionChart from "./real-beneficiary-distribution-chart";
import AssetValueDistributionChart from "./asset-value-distribution-chart";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { getAssetsWithBeneficiaries } from "@/data/assets";

export default async function Beneficiaries() {
  const sb = createClient();
  const { data: beneficiaries } = await sb.from("beneficiaries").select();
  const assets = await getAssetsWithBeneficiaries();
  if (!beneficiaries || !assets) {
    notFound();
  }

  const totalAllocationParts = beneficiaries.reduce(
    (acc, cur) => acc + cur.allocation,
    0
  );
  const remainingAllocationParts = +(100 - totalAllocationParts)
    .toFixed(2)
    .replace(/[.,]00$/, "");

  return (
    <section className="p-4">
      <div className="mx-auto mb-5 mt-3 flex max-w-xl items-center justify-between">
        <p className="text-lg font-bold">
          Total Allocation: <span>{totalAllocationParts} parts</span>
        </p>
        <AddBeneficiaryDialog
          remainingAllocationParts={remainingAllocationParts}
        />
      </div>
      <BeneficiariesTable beneficiaries={beneficiaries} />
      <DesiredBeneficiaryAllocationChart beneficiaries={beneficiaries} />
      <RealBeneficiaryDistributionChart assets={assets} />
      <AssetValueDistributionChart assets={assets} />
    </section>
  );
}
