import BeneficiariesTable from "./beneficiaries-table";
import DesiredBeneficiaryAllocationChart from "./desired-beneficiary-allocation-chart";
import BeneficiaryDialog from "./beneficiary-dialog";
import { beneficiariesData } from "@/app/data/db";

export default function Beneficiaries() {
  const totalAllocationParts = beneficiariesData.reduce(
    (acc, cur) => acc + cur.allocation,
    0,
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
        <BeneficiaryDialog
          remainingAllocationParts={remainingAllocationParts}
        />
      </div>
      <BeneficiariesTable />
      <DesiredBeneficiaryAllocationChart
        beneficiariesData={beneficiariesData}
      />
    </section>
  );
}
