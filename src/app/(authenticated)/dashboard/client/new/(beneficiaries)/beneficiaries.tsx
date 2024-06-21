"use client";

import { z } from "zod";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import BeneficiariesTable from "./beneficiaries-table";
import AddBeneficiaryDialog from "./add-beneficiary-dialog";

const beneficiarySchema = z.object({
  id: z.number(),
  name: z.string(),
  allocation: z.number(),
});

export type BeneficiarySchema = z.infer<typeof beneficiarySchema>;

export default function Beneficiaries({
  beneficiaries,
  handleDeleteBeneficiary,
}: {
  beneficiaries: BeneficiarySchema[];
  handleDeleteBeneficiary: (id: number) => void;
}) {
  return (
    <Card className="border-none">
      <CardHeader>
        <CardTitle className="mt-3 text-center text-4xl font-bold">
          Beneficiaries
        </CardTitle>
      </CardHeader>
      <CardContent>
        <BeneficiariesTable
          beneficiaries={beneficiaries}
          onDeleteBeneficiary={handleDeleteBeneficiary}
        />
      </CardContent>
      <CardFooter>
        <AddBeneficiaryDialog />
      </CardFooter>
    </Card>
  );
}
