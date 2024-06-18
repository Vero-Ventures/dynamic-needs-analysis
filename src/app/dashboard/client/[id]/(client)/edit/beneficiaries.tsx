"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BeneficiariesTable from "./beneficiaries-table";
import AddBeneficiaryDialog from "./beneficiary-add-dialog";

export default function Beneficiaries() {
  return (
    <Card className="mx-auto max-w-2xl border-none bg-secondary">
      <CardHeader>
        <CardTitle className="mt-3 text-center font-bold">
          Beneficiaries
        </CardTitle>
      </CardHeader>
      <CardContent>
        <BeneficiariesTable
          beneficiaries={[
            {
              id: 1,
              name: "John Doe",
              allocation: 1,
            },
            {
              id: 2,
              name: "Jane Doe",
              allocation: 1,
            },
          ]}
        />
        <AddBeneficiaryDialog remainingAllocationParts={0} />
      </CardContent>
    </Card>
  );
}
