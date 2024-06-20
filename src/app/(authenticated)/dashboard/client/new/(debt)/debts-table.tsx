import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DeleteBeneficiaryButton from "@/components/delete-item-button";
import { Input } from "@/components/ui/input";
import type { DebtSchema } from "./debts";

export default function DebtsTable({
  debts,
  onChangeDebt,
  onDeleteDebt,
}: {
  debts: DebtSchema[];
  onChangeDebt: (debt: DebtSchema) => void;
  onDeleteDebt: (id: number) => void;
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[300px]">Name</TableHead>
          <TableHead className="w-[200px]">Initial Value</TableHead>
          <TableHead>Interest Rate</TableHead>
          <TableHead className="w-[200px]">Annual payments</TableHead>
          <TableHead>Years held</TableHead>
          <TableHead>Actual term</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {debts.map((d) => (
          <DebtTableRow
            key={d.id}
            debt={d}
            onChangeDebt={onChangeDebt}
            onDeleteDebt={onDeleteDebt}
          />
        ))}
      </TableBody>
    </Table>
  );
}

function DebtTableRow({
  debt,
  onChangeDebt,
  onDeleteDebt,
}: {
  debt: DebtSchema;
  onChangeDebt: (Debt: DebtSchema) => void;
  onDeleteDebt: (id: number) => void;
}) {
  return (
    <TableRow>
      <TableCell className="text-center font-medium">
        <Input
          placeholder="Enter name"
          value={debt.name}
          onChange={(e) => onChangeDebt({ ...debt, name: e.target.value })}
        />
      </TableCell>
      <TableCell className="text-center font-medium">
        <Input
          value={debt.initial_value}
          onChange={(e) =>
            onChangeDebt({ ...debt, initial_value: +e.target.value })
          }
        />
      </TableCell>
      <TableCell className="text-center font-medium">
        <Input
          value={debt.rate}
          onChange={(e) => onChangeDebt({ ...debt, rate: +e.target.value })}
        />
      </TableCell>
      <TableCell className="text-center font-medium">
        <Input
          value={debt.annual_payment}
          onChange={(e) =>
            onChangeDebt({ ...debt, annual_payment: +e.target.value })
          }
        />
      </TableCell>
      <TableCell className="text-center font-medium">
        <Input
          value={debt.years_held}
          onChange={(e) =>
            onChangeDebt({ ...debt, years_held: +e.target.value })
          }
        />
      </TableCell>
      <TableCell className="text-center font-medium">
        <Input
          value={debt.actual_term}
          onChange={(e) =>
            onChangeDebt({ ...debt, actual_term: +e.target.value })
          }
        />
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
