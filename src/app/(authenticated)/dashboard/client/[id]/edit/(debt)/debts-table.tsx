import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatMoney } from "@/lib/utils";
import { createClient } from "@/lib/supabase/server";
import type { Debt } from "@/types/db";
import DeleteDebtButton from "./delete-debt-button";
import EditDebtDialog from "./edit-debt-dialog";

export default async function DebtsTable({ clientId }: { clientId: number }) {
  const sb = await createClient();
  const { data: debts, error } = await sb
    .from("debts")
    .select()
    .eq("client_id", clientId);

  if (error) {
    // handle error
  }
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-center">Name</TableHead>
          <TableHead className="text-center">Initial Value</TableHead>
          <TableHead className="text-center">Interest Rate</TableHead>
          <TableHead className="text-center">Annual payment</TableHead>
          <TableHead className="text-center">Years Acquired</TableHead>
          <TableHead className="text-center">Actual term</TableHead>
          <TableHead></TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {debts?.map((d) => <DebtTableRow key={d.id} debt={d} />)}
      </TableBody>
    </Table>
  );
}

function DebtTableRow({ debt }: { debt: Debt }) {
  return (
    <TableRow>
      <TableCell className="text-center font-medium">{debt.name}</TableCell>
      <TableCell className="text-center font-medium">
        {formatMoney(debt.initial_value)}
      </TableCell>
      <TableCell className="text-center font-medium">
        {debt.rate + "%"}
      </TableCell>
      <TableCell className="text-center font-medium">
        {formatMoney(debt.annual_payment)}
      </TableCell>
      <TableCell className="text-center font-medium">
        {debt.year_acquired}
      </TableCell>
      <TableCell className="text-center font-medium">
        {debt.term + " years"}
      </TableCell>
      <TableCell className="text-center">
        <EditDebtDialog debt={debt} />
      </TableCell>
      <TableCell className="text-center">
        <DeleteDebtButton id={debt.id} />
      </TableCell>
    </TableRow>
  );
}
