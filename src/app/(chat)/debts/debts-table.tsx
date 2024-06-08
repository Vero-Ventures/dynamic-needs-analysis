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
import type { DebtData } from "@/app/data/db";
import { debtsData } from "@/app/data/db";
import DeleteBeneficiaryButton from "@/components/delete-item-button";
import { deleteDebt } from "./actions";
import { formatMoney } from "@/lib/utils";

export type Beneficiary = {
  name: string;
  allocation: number;
};
export default function DebtsTable() {
  const totalInitialValue = debtsData.reduce(
    (acc, cur) => acc + cur.initialValue,
    0,
  );
  const totalInsurableFutureValueDollars = debtsData.reduce(
    (acc, cur) => acc + cur.insurableFutureValueDollars,
    0,
  );

  return (
    <Table className="mx-auto max-w-2xl">
      <TableHeader>
        <TableRow>
          <TableHead className="text-center">Name</TableHead>
          <TableHead className="text-center">Initial Value ($)</TableHead>
          <TableHead className="text-center">
            Insurable Future Value ($)
          </TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {debtsData.map((debt) => (
          <DebtsTableRow
            key={debt.id}
            id={debt.id}
            name={debt.name}
            initialValue={debt.initialValue}
            insurableFutureValueDollars={debt.insurableFutureValueDollars}
          />
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
          <TableCell></TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}

function DebtsTableRow({
  id,
  name,
  initialValue,
  insurableFutureValueDollars,
}: Pick<
  DebtData,
  "id" | "name" | "initialValue" | "insurableFutureValueDollars"
>) {
  return (
    <TableRow>
      <TableCell className="text-center font-medium">{name}</TableCell>
      <TableCell className="text-center font-medium">
        {formatMoney(initialValue)}
      </TableCell>
      <TableCell className="text-center font-medium">
        {formatMoney(insurableFutureValueDollars)}
      </TableCell>
      <TableCell className="text-right">
        <DeleteDebt id={id} />
      </TableCell>
    </TableRow>
  );
}

function DeleteDebt({ id }: { id: number }) {
  const deleteBeneficiaryWithBind = deleteDebt.bind(null, id);
  return (
    <form action={deleteBeneficiaryWithBind}>
      <DeleteBeneficiaryButton />
    </form>
  );
}
