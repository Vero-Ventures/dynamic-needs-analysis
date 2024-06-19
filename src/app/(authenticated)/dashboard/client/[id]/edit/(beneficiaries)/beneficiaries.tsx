"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import BeneficiariesTable from "./beneficiaries-table";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { z } from "zod";

const beneficiarySchema = z.object({
  id: z.number(),
  name: z.string(),
  allocation: z.number(),
});

export type BeneficiarySchema = z.infer<typeof beneficiarySchema>;

export default function Beneficiaries() {
  const [beneficiaries, setBeneficiaries] = useState<BeneficiarySchema[]>([
    {
      id: 0,
      name: "",
      allocation: 0,
    },
  ]);
  function handleAddBeneficiaries(beneficiary: BeneficiarySchema) {
    setBeneficiaries([...beneficiaries, beneficiary]);
  }

  function handleDeleteBeneficiary(id: number) {
    setBeneficiaries(beneficiaries.filter((b) => b.id !== id));
  }

  function handleOnChangeBeneficiary(beneficiary: BeneficiarySchema) {
    setBeneficiaries(
      beneficiaries.map((b) => (b.id === beneficiary.id ? beneficiary : b))
    );
  }
  return (
    <Card className="mx-auto max-w-3xl border-none">
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
