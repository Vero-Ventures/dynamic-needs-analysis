import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Beneficiary } from "@/app/data/db";
import { beneficiaries } from "@/app/data/db";
import { cn } from "@/lib/utils";
import { deleteBeneficiary } from "./actions";
import DeleteBeneficiaryButton from "@/components/delete-item-button";

export default function BeneficiariesTable() {
  return (
    <Table className="mx-auto max-w-xl">
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
            Allocation (%)
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {beneficiaries.map((b) => (
          <BeneficiaryTableRow
            key={b.id}
            id={b.id}
            name={b.name}
            allocation={b.allocation}
          />
        ))}
      </TableBody>
    </Table>
  );
}

function BeneficiaryTableRow({ id, name, allocation }: Beneficiary) {
  return (
    <TableRow>
      <TableCell className="text-center font-medium">{name}</TableCell>
      <TableCell className="text-center font-medium">{allocation}</TableCell>
      <TableCell className="text-right">
        <DeleteBeneficiary id={id} />
      </TableCell>
    </TableRow>
  );
}

function DeleteBeneficiary({ id }: { id: number }) {
  const deleteBeneficiaryWithBind = deleteBeneficiary.bind(null, id);
  return (
    <form action={deleteBeneficiaryWithBind}>
      <DeleteBeneficiaryButton />
    </form>
  );
}
