import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DeleteAssetButton from "./delete-asset-button";
import { formatMoney } from "@/lib/utils";
import EditAssetDialog from "./edit-asset-dialog";
import type { SingleAssetWithBeneficiaries } from "@/data/assets";
import { getAssetsWithBeneficiaries } from "@/data/assets";
import type { Beneficiary } from "@/types/db";

export default async function AssetsTable({
  clientId,
  beneficiaries,
}: {
  clientId: number;
  beneficiaries: Omit<Beneficiary, "created_at" | "client_id">[];
}) {
  const assets = await getAssetsWithBeneficiaries(clientId);

  const totalPurchasePrice = assets?.reduce(
    (acc, asset) => acc + asset.initial_value,
    0
  );
  const totalCurrentValue = assets?.reduce(
    (acc, asset) => acc + asset.current_value,
    0
  );

  return (
    <Table className="mx-auto max-w-3xl">
      <TableHeader>
        <TableRow>
          <TableHead className="text-center">Name</TableHead>
          <TableHead className="text-center">Year Acquired</TableHead>
          <TableHead className="text-center">Purchase Price</TableHead>
          <TableHead className="text-center">Current Value ($)</TableHead>
          <TableHead className="text-right"></TableHead>
          <TableHead className="text-right"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {assets?.map((asset) => (
          <AssetTableRow
            key={asset.id}
            asset={asset}
            beneficiaries={beneficiaries}
          />
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell className="text-center">Total</TableCell>
          <TableCell></TableCell>
          <TableCell className="text-center">
            {formatMoney(totalPurchasePrice || 0)}
          </TableCell>
          <TableCell className="text-center">
            {formatMoney(totalCurrentValue || 0)}
          </TableCell>
          <TableCell colSpan={2}></TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}

function AssetTableRow({
  asset,
  beneficiaries,
}: {
  asset: SingleAssetWithBeneficiaries;
  beneficiaries: Omit<Beneficiary, "created_at" | "client_id">[];
}) {
  return (
    <TableRow>
      <TableCell className="text-center font-medium">{asset.name}</TableCell>
      <TableCell className="text-center font-medium">
        {asset.year_acquired}
      </TableCell>
      <TableCell className="text-center font-medium">
        {formatMoney(asset.initial_value)}
      </TableCell>
      <TableCell className="text-center font-medium">
        {formatMoney(asset.current_value)}
      </TableCell>
      <TableCell>
        <EditAssetDialog editAsset={asset} beneficiaries={beneficiaries} />
      </TableCell>
      <TableCell className="text-right">
        <DeleteAssetButton id={asset.id} />
      </TableCell>
    </TableRow>
  );
}
