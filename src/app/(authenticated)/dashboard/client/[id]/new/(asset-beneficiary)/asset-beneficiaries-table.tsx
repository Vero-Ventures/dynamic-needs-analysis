import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DeleteAssetBeneficiaryButton from "./delete-asset-beneficiary-button";

export type AssetBeneficiary = {
  allocation: number;
  already_assigned: boolean;
  asset_id: number;
  beneficiary_id: number;
  created_at: string;
  id: number;
  beneficiaries: {
    allocation: number;
    client_id: number;
    created_at: string;
    id: number;
    name: string;
  } | null;
}[];

export default async function AssetBeneficiariesTable({
  assetBeneficiaries,
}: {
  assetBeneficiaries: AssetBeneficiary;
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-left">Name</TableHead>
          <TableHead className="text-center">Allocation</TableHead>
          <TableHead className="text-right"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {assetBeneficiaries.map((a) => (
          <TableRow key={a.id}>
            <TableCell className="text-center">
              {a.beneficiaries?.name}
            </TableCell>
            <TableCell className="text-center">{a.allocation}</TableCell>
            <TableCell className="text-right">
              <DeleteAssetBeneficiaryButton
                id={a.id}
                assetId={a.asset_id}
                beneficiaryId={a.beneficiary_id}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
