import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Beneficiary } from "@/types/db";
import { createClient } from "@/lib/supabase/server";
import DeleteBeneficiaryButton from "./delete-beneficiary-button";
import EditBeneficiaryDialog from "./edit-beneficiary-dialog";

export default async function BeneficiariesTable({
  clientId,
}: {
  clientId: number;
}) {
  const sb = await createClient();
  const { data: beneficiaries, error } = await sb
    .from("beneficiaries")
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
          <TableHead className="text-center">
            Desired total target allocation of assets
          </TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {beneficiaries?.map((b) => (
          <BeneficiaryTableRow key={b.id} beneficiary={b} />
        ))}
      </TableBody>
    </Table>
  );
}

function BeneficiaryTableRow({ beneficiary }: { beneficiary: Beneficiary }) {
  return (
    <TableRow>
      <TableCell className="text-center font-medium">
        {beneficiary.name}
      </TableCell>
      <TableCell className="text-center font-medium">
        {beneficiary.allocation}
      </TableCell>
      <TableCell className="text-center">
        <EditBeneficiaryDialog beneficiary={beneficiary} />
      </TableCell>
      <TableCell className="text-center">
        <DeleteBeneficiaryButton id={beneficiary.id} />
      </TableCell>
    </TableRow>
  );
}
