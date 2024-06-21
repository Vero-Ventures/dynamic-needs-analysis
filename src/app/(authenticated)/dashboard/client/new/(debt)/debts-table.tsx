import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DeleteBeneficiaryButton from "@/components/delete-item-button";
import type { DebtSchema } from "./debts";
import { formatMoney } from "@/lib/utils";

export default function DebtsTable({
  debts,
  onDeleteDebt,
}: {
  debts: DebtSchema[];
  onDeleteDebt: (id: number) => void;
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-center">Name</TableHead>
          <TableHead className="text-center">Initial Value</TableHead>
          <TableHead className="text-center">Interest Rate</TableHead>
          <TableHead className="text-center">Annual payments</TableHead>
          <TableHead className="text-center">Years held</TableHead>
          <TableHead className="text-center">Actual term</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {debts.map((d) => (
          <DebtTableRow key={d.id} debt={d} onDeleteDebt={onDeleteDebt} />
        ))}
      </TableBody>
    </Table>
  );
}

function DebtTableRow({
  debt,
  onDeleteDebt,
}: {
  debt: DebtSchema;
  onDeleteDebt: (id: number) => void;
}) {
  return (
    <TableRow>
      <TableCell className="text-center font-medium">{debt.name}</TableCell>
      <TableCell className="text-center font-medium">
        {formatMoney(debt.initial_value)}
      </TableCell>
      <TableCell className="text-center font-medium">{debt.rate}</TableCell>
      <TableCell className="text-center font-medium">
        {formatMoney(debt.annual_payment)}
      </TableCell>
      <TableCell className="text-center font-medium">
        {debt.years_held}
      </TableCell>
      <TableCell className="text-center font-medium">
        {debt.actual_term}
      </TableCell>
      <TableCell className="text-right">
        <DeleteBeneficiaryButton
          size="icon"
          onClick={() => onDeleteDebt(debt.id)}
        />
      </TableCell>
    </TableRow>
  );
}
