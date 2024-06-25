"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatMoney } from "@/lib/utils";
import type { Debt } from "@/types/db";

export default function DebtsTable({ debts }: { debts: Debt[] }) {
  const totalInitialValue = debts.reduce(
    (acc, cur) => acc + cur.initial_value,
    0
  );
  const totalInsurableFutureValueDollars = debts.reduce(
    (acc, cur) => acc + cur.insurable_future_value_dollars,
    0
  );

  return (
    <Table className="w-fit">
      <TableHeader>
        <TableRow>
          <TableHead className="text-center">Name</TableHead>
          <TableHead className="text-center">Initial Value ($)</TableHead>
          <TableHead className="text-center">
            Insurable Future Value ($)
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {debts.map((d) => (
          <DebtsTableRow key={d.id} debt={d} />
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell className="text-center">Total</TableCell>
          <TableCell className="text-center">
            {formatMoney(totalInitialValue)}
          </TableCell>
          <TableCell className="text-center">
            {formatMoney(totalInsurableFutureValueDollars)}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}

function DebtsTableRow({ debt }: { debt: Debt }) {
  return (
    <TableRow>
      <TableCell className="text-center font-medium">{debt.name}</TableCell>
      <TableCell className="text-center font-medium">
        {formatMoney(debt.initial_value)}
      </TableCell>
      <TableCell className="text-center font-medium">
        {formatMoney(debt.insurable_future_value_dollars)}
      </TableCell>
    </TableRow>
  );
}
