import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import type { Beneficiary } from "@/types/db";

export default function BeneficiariesTable({
  beneficiaries,
}: {
  beneficiaries: Beneficiary[];
}) {
  const totalAllocationParts = beneficiaries.reduce(
    (acc, cur) => acc + cur.allocation,
    0
  );
  return (
    <Table className="max-w-xl">
      <TableHeader>
        <TableRow>
          <TableHead
            className={cn("text-left", {
              "text-center": beneficiaries.length !== 0,
            })}
          >
            Name
          </TableHead>
          <TableHead
            className={cn("text-right", {
              "text-center": beneficiaries.length !== 0,
            })}
          >
            Allocation (parts)
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {beneficiaries.map((b) => (
          <BeneficiaryTableRow
            key={b.id}
            name={b.name}
            allocation={b.allocation}
          />
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell className="text-center font-bold">Total</TableCell>
          <TableCell className="text-center font-bold">
            {totalAllocationParts}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}

function BeneficiaryTableRow({
  name,
  allocation,
}: Pick<Beneficiary, "name" | "allocation">) {
  return (
    <TableRow>
      <TableCell className="text-center font-medium">{name}</TableCell>
      <TableCell className="text-center font-medium">{allocation}</TableCell>
    </TableRow>
  );
}
