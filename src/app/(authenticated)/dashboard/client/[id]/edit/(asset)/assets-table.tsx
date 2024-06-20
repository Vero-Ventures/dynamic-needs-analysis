import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DeleteAssetButton from "@/components/delete-item-button";
import { formatMoney } from "@/lib/utils";
import type { AssetWithBeneficiaries } from "./assets";

export default function AssetsTable({
  assets,
}: {
  assets: AssetWithBeneficiaries[];
}) {
  const totalPurchasePrice = assets.reduce(
    (acc, asset) => acc + asset.purchase_price,
    0
  );
  const totalCurrentValue = assets.reduce(
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
        {assets.map((asset) => (
          <AssetTableRow key={asset.id} asset={asset} />
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell className="text-center">Total</TableCell>
          <TableCell></TableCell>
          <TableCell className="text-center">
            {formatMoney(totalPurchasePrice)}
          </TableCell>
          <TableCell className="text-center">
            {formatMoney(totalCurrentValue)}
          </TableCell>
          <TableCell colSpan={2}></TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}

function AssetTableRow({ asset }: { asset: AssetWithBeneficiaries }) {
  return (
    <TableRow>
      <TableCell className="text-center font-medium">{asset.name}</TableCell>
      <TableCell className="text-center font-medium">
        {asset.year_acquired}
      </TableCell>
      <TableCell className="text-center font-medium">
        {formatMoney(asset.purchase_price)}
      </TableCell>
      <TableCell className="text-center font-medium">
        {formatMoney(asset.current_value)}
      </TableCell>
      <TableCell className="text-right">
        <DeleteAssetButton size="icon" />
      </TableCell>
    </TableRow>
  );
}
