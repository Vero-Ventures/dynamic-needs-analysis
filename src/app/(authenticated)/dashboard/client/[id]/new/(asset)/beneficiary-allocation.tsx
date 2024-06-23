import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { AssetBeneficiary } from "./add-asset-form";

export default function BeneficiaryAllocation({
  assetBeneficiaries,
  onEditBeneficiary,
  onToggleBeneficiary,
}: {
  assetBeneficiaries: AssetBeneficiary[];
  onEditBeneficiary: (id: number, allocation: number) => void;
  onToggleBeneficiary: (id: number, already_assigned: boolean) => void;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Beneficiary Allocation</CardTitle>
      </CardHeader>
      <CardContent>
        <BeneficiaryTable
          assetBeneficiaries={assetBeneficiaries}
          onEditBeneficiary={onEditBeneficiary}
          onToggleBeneficiary={onToggleBeneficiary}
        />
      </CardContent>
    </Card>
  );
}

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

export function BeneficiaryTable({
  assetBeneficiaries,
  onEditBeneficiary,
  onToggleBeneficiary,
}: {
  assetBeneficiaries: AssetBeneficiary[];
  onEditBeneficiary: (id: number, allocation: number) => void;
  onToggleBeneficiary: (id: number, already_assigned: boolean) => void;
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px] text-center">Name</TableHead>
          <TableHead className="text-center">Allocation (Parts)</TableHead>
          <TableHead className="text-right"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {assetBeneficiaries.map((beneficiary) => (
          <TableRow key={beneficiary.id}>
            <TableCell
              className={cn("w-[150px] text-center font-medium", {
                "text-muted-foreground": !beneficiary.already_assigned,
              })}
            >
              {beneficiary.name}
            </TableCell>
            <TableCell
              className={cn("text-center", {
                "text-muted-foreground": !beneficiary.already_assigned,
              })}
            >
              <Input
                type="number"
                className="mx-auto w-44"
                value={beneficiary.allocation}
                placeholder="0"
                min={0}
                disabled={!beneficiary.already_assigned}
                onChange={(e) =>
                  onEditBeneficiary(beneficiary.id, +e.target.value)
                }
              />
            </TableCell>
            <TableCell className="text-center">
              <ToggleBeneficiary
                id={beneficiary.id}
                already_assigned={beneficiary.already_assigned}
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
  already_assigned,
  onToggleBeneficiary,
}: {
  id: number;
  already_assigned: boolean;
  onToggleBeneficiary: (id: number, already_assigned: boolean) => void;
}) {
  return (
    <Switch
      checked={already_assigned}
      onCheckedChange={(checked) => onToggleBeneficiary(id, checked)}
    />
  );
}
