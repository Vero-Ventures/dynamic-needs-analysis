"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import BeneficiariesTable from "./beneficiaries-table";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { z } from "zod";

const beneficiarySchema = z.object({
  id: z.number(),
  name: z.string(),
  allocation: z.number(),
});

export type BeneficiarySchema = z.infer<typeof beneficiarySchema>;

export default function Beneficiaries({
  beneficiaries,
  handleAddBeneficiaries,
  handleDeleteBeneficiary,
  handleOnChangeBeneficiary,
}: {
  beneficiaries: BeneficiarySchema[];
  handleAddBeneficiaries: (beneficiary: BeneficiarySchema) => void;
  handleDeleteBeneficiary: (id: number) => void;
  handleOnChangeBeneficiary: (beneficiary: BeneficiarySchema) => void;
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
          onChangeBeneficiary={handleOnChangeBeneficiary}
          onDeleteBeneficiary={handleDeleteBeneficiary}
        />
      </CardContent>
      <CardFooter>
        <Button
          onClick={() =>
            handleAddBeneficiaries({
              id: beneficiaries.length,
              allocation: 0,
              name: "",
            })
          }
          className="my-4 space-x-1 rounded-full border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-foreground"
          variant="outline"
        >
          <PlusIcon className="h-5 w-5" />
          <span>Add Beneficiary</span>
        </Button>
      </CardFooter>
    </Card>
  );
}
