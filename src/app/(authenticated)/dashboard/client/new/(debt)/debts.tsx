"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { z } from "zod";
import DebtsTable from "./debts-table";

const debtSchema = z.object({
  id: z.number(),
  name: z.string(),
  initial_value: z.coerce.number(),
  rate: z.coerce.number(),
  annual_payment: z.coerce.number(),
  years_held: z.coerce.number(),
  actual_term: z.coerce.number(),
});

export type DebtSchema = z.infer<typeof debtSchema>;

export default function Debts() {
  const [debts, setDebts] = useState<DebtSchema[]>([
    {
      id: 0,
      name: "",
      initial_value: 0,
      rate: 0,
      annual_payment: 0,
      years_held: 0,
      actual_term: 0,
    },
  ]);
  function handleAddDebt(debt: DebtSchema) {
    setDebts([...debts, debt]);
  }

  function handleDeleteDebt(id: number) {
    setDebts(debts.filter((d) => d.id !== id));
  }

  function handleOnChangeDebt(debt: DebtSchema) {
    setDebts(debts.map((d) => (d.id === debt.id ? debt : d)));
  }
  return (
    <Card className="border-none">
      <CardHeader>
        <CardTitle className="mt-3 text-center text-4xl font-bold">
          Debts
        </CardTitle>
      </CardHeader>
      <CardContent>
        <DebtsTable
          debts={debts}
          onChangeDebt={handleOnChangeDebt}
          onDeleteDebt={handleDeleteDebt}
        />
      </CardContent>
      <CardFooter>
        <Button
          onClick={() =>
            handleAddDebt({
              id: debts.length,
              name: "",
              initial_value: 0,
              rate: 0,
              annual_payment: 0,
              years_held: 0,
              actual_term: 0,
            })
          }
          className="my-4 space-x-1 rounded-full border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-foreground"
          variant="outline"
        >
          <PlusIcon className="h-5 w-5" />
          <span>Add Debt</span>
        </Button>
      </CardFooter>
    </Card>
  );
}
