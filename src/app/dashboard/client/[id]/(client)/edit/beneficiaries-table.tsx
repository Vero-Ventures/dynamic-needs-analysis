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
import { Input } from "@/components/ui/input";

export default function BeneficiariesTable({
  beneficiaries,
  onChangeBeneficiary,
  onDeleteBeneficiary,
}: {
  beneficiaries: BeneficiarySchema[];
  onChangeBeneficiary: (beneficiary: BeneficiarySchema) => void;
  onDeleteBeneficiary: (id: number) => void;
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Desired total target allocation of assets</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {beneficiaries.map((b) => (
          <BeneficiaryTableRow
            key={b.id}
            beneficiary={b}
            onChangeBeneficiary={onChangeBeneficiary}
            onDeleteBeneficiary={onDeleteBeneficiary}
          />
        ))}
      </TableBody>
    </Table>
  );
}

function BeneficiaryTableRow({
  beneficiary,
  onChangeBeneficiary,
  onDeleteBeneficiary,
}: {
  beneficiary: BeneficiarySchema;
  onChangeBeneficiary: (beneficiary: BeneficiarySchema) => void;
  onDeleteBeneficiary: (id: number) => void;
}) {
  return (
    <TableRow>
      <TableCell className="text-center font-medium">
        <Input
          placeholder="Name"
          value={beneficiary.name}
          onChange={(e) =>
            onChangeBeneficiary({ ...beneficiary, name: e.target.value })
          }
        />
      </TableCell>
      <TableCell className="text-center font-medium">
        <Input
          value={beneficiary.allocation}
          onChange={(e) =>
            onChangeBeneficiary({
              ...beneficiary,
              allocation: Number.parseInt(e.target.value),
            })
          }
        />
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
