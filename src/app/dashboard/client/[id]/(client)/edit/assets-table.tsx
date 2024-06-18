import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DeleteItemButton from "@/components/delete-item-button";
import { formatMoney } from "@/lib/utils";
import { SquarePenIcon } from "lucide-react";
import { calculateTotalCurrentValue } from "@/lib/asset/manager-utils";
import type { Tables } from "../../../../../../../types/supabase";
import type { AssetsWithBeneficiaries } from "@/data/assets";
import Link from "next/link";

export default function AssetsTable({
  assets,
  businesses,
}: {
  assets: AssetsWithBeneficiaries;
  businesses: Tables<"businesses">[];
}) {
  const totalCurrentValue = calculateTotalCurrentValue(assets, businesses);

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
        {businesses.map((business) => (
          <TableRow key={business.id}>
            <TableCell className="text-center font-medium">
              {business.name}
            </TableCell>
            <TableCell className="text-center">
              {formatMoney(business.valuation)}
            </TableCell>
            <TableCell className="text-center">
              {`${business.appreciation_rate}%`}
            </TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow>
        ))}
        {assets.map((asset) => (
          <TableRow key={asset.id}>
            <TableCell className="text-center font-medium">
              {asset.name}
            </TableCell>
            <TableCell className="text-center">
              {formatMoney(asset.current_value)}
            </TableCell>
            <TableCell className="text-center">{`${asset.rate}%`}</TableCell>
            <TableCell>
              <Link
                href={`/dashboard/client/1/assets/edit/${asset.id}`}
                className="hover:cursor-pointer"
              >
                <SquarePenIcon />
              </Link>
            </TableCell>
            <TableCell>
              <DeleteAsset id={asset.id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell className="text-center">Total</TableCell>
          <TableCell className="text-center">
            {formatMoney(totalCurrentValue)}
          </TableCell>
          <TableCell></TableCell>
          <TableCell colSpan={2}></TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
function DeleteAsset({ id }: { id: number }) {
  //   const deleteAssetWithBind = deleteAsset.bind(null, id);
  console.log(id);
  return (
    <form>
      <DeleteItemButton />
    </form>
  );
}
