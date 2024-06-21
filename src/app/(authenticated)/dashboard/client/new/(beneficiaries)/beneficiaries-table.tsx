import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DeleteBeneficiaryButton from "@/components/delete-item-button";
import type { BeneficiarySchema } from "./beneficiaries";

export default function BeneficiariesTable({
  beneficiaries,
  onDeleteBeneficiary,
}: {
  beneficiaries: BeneficiarySchema[];
  onDeleteBeneficiary: (id: number) => void;
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-center">Name</TableHead>
          <TableHead className="text-center">
            Desired total target allocation of assets
          </TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {beneficiaries.map((b) => (
          <BeneficiaryTableRow
            key={b.id}
            beneficiary={b}
            onDeleteBeneficiary={onDeleteBeneficiary}
          />
        ))}
      </TableBody>
    </Table>
  );
}

function BeneficiaryTableRow({
  beneficiary,
  onDeleteBeneficiary,
}: {
  beneficiary: BeneficiarySchema;
  onDeleteBeneficiary: (id: number) => void;
}) {
  return (
    <TableRow>
      <TableCell className="text-center font-medium">
        {beneficiary.name}
      </TableCell>
      <TableCell className="text-center font-medium">
        {beneficiary.allocation}
      </TableCell>
      <TableCell className="text-right">
        <DeleteBeneficiaryButton
          size="icon"
          onClick={() => onDeleteBeneficiary(beneficiary.id)}
        />
      </TableCell>
    </TableRow>
  );
}
