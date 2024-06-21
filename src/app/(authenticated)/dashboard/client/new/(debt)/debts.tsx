"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import { z } from "zod";
import DebtsTable from "./debts-table";
import AddDebtDialog from "./add-debt-dialog";

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
      name: "Bank Loan",
      initial_value: 1000,
      rate: 2,
      annual_payment: 100,
      years_held: 5,
      actual_term: 5,
    },
  ]);

  function handleDeleteDebt(id: number) {
    setDebts(debts.filter((d) => d.id !== id));
  }

  return (
    <Card className="border-none">
      <CardHeader>
        <CardTitle className="mt-3 text-center text-4xl font-bold">
          Debts
        </CardTitle>
      </CardHeader>
      <CardContent>
        <DebtsTable debts={debts} onDeleteDebt={handleDeleteDebt} />
      </CardContent>
      <CardFooter>
        <AddDebtDialog />
      </CardFooter>
    </Card>
  );
}
