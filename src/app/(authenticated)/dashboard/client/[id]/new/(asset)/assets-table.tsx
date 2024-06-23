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
import { createClient } from "@/lib/supabase/server";
import type { Asset } from "@/types/db";

export default async function AssetsTable({ clientId }: { clientId: number }) {
  const sb = await createClient();
  const { data: assets, error } = await sb
    .from("assets")
    .select()
    .eq("client_id", clientId);

  if (error) {
    // handle error
  }

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
        {assets?.map((asset) => <AssetTableRow key={asset.id} asset={asset} />)}
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

function AssetTableRow({ asset }: { asset: Asset }) {
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
      <TableCell className="text-right">
        <DeleteAssetButton />
      </TableCell>
    </TableRow>
  );
}
