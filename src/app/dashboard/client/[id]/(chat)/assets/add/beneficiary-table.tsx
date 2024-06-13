import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import EditBeneficiaryDialog from "./edit-beneficiary-dialog";
import { Switch } from "@/components/ui/switch";
import type { AssetBeneficiary } from "./add-assets-stepper";
import { SquarePenIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function BeneficiaryTable({
  assetBeneficiaries,
  onToggleBeneficiary,
  onEditBeneficiary,
}: {
  assetBeneficiaries: AssetBeneficiary[];
  onToggleBeneficiary: (id: number, isAssetAssigned: boolean) => void;
  onEditBeneficiary: (updatedBeneficiary: AssetBeneficiary) => void;
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px] text-center">Name</TableHead>
          <TableHead className="text-center">Allocation (%)</TableHead>
          <TableHead className="text-right"></TableHead>
          <TableHead className="text-right"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {assetBeneficiaries.map((beneficiary) => (
          <TableRow key={beneficiary.id}>
            <TableCell
              className={cn("w-[150px] text-center font-medium", {
                "text-muted-foreground": !beneficiary.isAssetAssigned,
              })}
            >
              {beneficiary.name}
            </TableCell>
            <TableCell
              className={cn("text-center", {
                "text-muted-foreground": !beneficiary.isAssetAssigned,
              })}
            >
              {beneficiary.allocation}%
            </TableCell>
            <TableCell className="text-center">
              {beneficiary.isAssetAssigned ? (
                <EditBeneficiaryDialog
                  beneficiary={beneficiary}
                  onEditBeneficiary={onEditBeneficiary}
                />
              ) : (
                <SquarePenIcon className="text-muted-foreground hover:cursor-not-allowed" />
              )}
            </TableCell>
            <TableCell className="text-center">
              <ToggleBeneficiary
                id={beneficiary.id}
                isAssetAssigned={beneficiary.isAssetAssigned}
                onToggleBeneficiary={onToggleBeneficiary}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function ToggleBeneficiary({
  id,
  isAssetAssigned,
  onToggleBeneficiary,
}: {
  id: number;
  isAssetAssigned: boolean;
  onToggleBeneficiary: (id: number, isAssetAssigned: boolean) => void;
}) {
  return (
    <Switch
      checked={isAssetAssigned}
      onCheckedChange={(checked) => onToggleBeneficiary(id, checked)}
    />
  );
}
