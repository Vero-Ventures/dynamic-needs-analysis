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
import DeleteBeneficiaryButton from "@/components/delete-item-button";
import { deleteDebt } from "./actions";
import { formatMoney } from "@/lib/utils";
import { SquarePenIcon } from "lucide-react";
import Link from "next/link";
import type { Tables } from "../../../../../../types/supabase";

export default function DebtsTable({ debts }: { debts: Tables<"debts">[] }) {
  const totalInitialValue = debts.reduce(
    (acc, cur) => acc + cur.initial_value,
    0
  );
  const totalInsurableFutureValueDollars = debts.reduce(
    (acc, cur) => acc + cur.insurable_future_value_dollars,
    0
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
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {debts.map((debt) => (
          <DebtsTableRow
            key={debt.id}
            id={debt.id}
            name={debt.name}
            initial_value={debt.initial_value}
            insurable_future_value_dollars={debt.insurable_future_value_dollars}
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
          <TableCell></TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}

function DebtsTableRow({
  id,
  name,
  initial_value,
  insurable_future_value_dollars,
}: Pick<
  Tables<"debts">,
  "id" | "name" | "initial_value" | "insurable_future_value_dollars"
>) {
  return (
    <TableRow>
      <TableCell className="text-center font-medium">{name}</TableCell>
      <TableCell className="text-center font-medium">
        {formatMoney(initial_value)}
      </TableCell>
      <TableCell className="text-center font-medium">
        {formatMoney(insurable_future_value_dollars)}
      </TableCell>
      <TableCell>
        <Link href={`/dashboard/client/1/debts/edit?id=${id}`}>
          <SquarePenIcon className="hover:cursor-pointer" />
        </Link>
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
