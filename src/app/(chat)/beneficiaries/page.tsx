"use client";

import { useState } from "react";
import type { Beneficiary } from "./beneficiaries-table";
import BeneficiariesTable from "./beneficiaries-table";
import DesiredBeneficiaryAllocationChart from "./desired-beneficiary-allocation-chart";

export default function BeneficiariesPage() {
  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([]);
  return (
    <div>
      <BeneficiariesTable
        beneficiaries={beneficiaries}
        setBeneficiaries={setBeneficiaries}
      />
      <DesiredBeneficiaryAllocationChart beneficiaries={beneficiaries} />
    </div>
  );
}
