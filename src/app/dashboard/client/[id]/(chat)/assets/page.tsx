import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function Assets() {
  return (
    <div className="p-4">
      <div className="mx-auto mb-5 mt-3 flex max-w-2xl items-center justify-between">
        <Link
          className={cn(buttonVariants())}
          href="/dashboard/client/1/assets/add"
        >
          Add New Asset
        </Link>
      </div>
      <div className="mt-9 space-y-12">
        <AssetsTable />
        <BeneficiaryDistributionTable />
      </div>
    </div>
  );
}

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
import { deleteAsset } from "./actions";
import { cn, formatMoney } from "@/lib/utils";
import { SquarePenIcon } from "lucide-react";
import { assets, businesses } from "@/app/data/db";

function AssetsTable() {
  const totalAssetCurrentValue = assets.reduce((acc, asset) => {
    return acc + asset.currentValue;
  }, 0);
  const totalBusinessCurrentValue = businesses.reduce((acc, business) => {
    return acc + business.valuation;
  }, 0);
  const totalCurrentValue = totalAssetCurrentValue + totalBusinessCurrentValue;

  return (
    <Table className="mx-auto max-w-2xl">
      <TableHeader>
        <TableRow>
          <TableHead className="text-center">Name</TableHead>
          <TableHead className="text-center">Current Value ($)</TableHead>
          <TableHead className="text-center">Appreciation Rate (%)</TableHead>
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
              {`${business.appreciationRate}%`}
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
              {formatMoney(asset.currentValue)}
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
  const deleteAssetWithBind = deleteAsset.bind(null, id);
  return (
    <form action={deleteAssetWithBind}>
      <DeleteItemButton />
    </form>
  );
}

function BeneficiaryDistributionTable() {
  return (
    <Table className="mx-auto max-w-2xl">
      <TableHeader>
        <TableRow>
          <TableHead className="text-center">Beneficiary</TableHead>
          <TableHead className="text-center">Amount ($)</TableHead>
          <TableHead className="text-center">Percentage (%)</TableHead>
          <TableHead className="text-center">Ideal Distribution (%)</TableHead>
          <TableHead className="text-center">Additional Required ($)</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="text-center font-medium">
            {"John Harrison"}
          </TableCell>
          <TableCell className="text-center">{formatMoney(8474.75)}</TableCell>
          <TableCell className="text-center">{`${25}%`}</TableCell>
          <TableCell className="text-center">{`${25}%`}</TableCell>
          <TableCell className="text-center">{formatMoney(0)}</TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell className="text-center">Total</TableCell>
          <TableCell className="text-center">{formatMoney(8474.75)}</TableCell>
          <TableCell className="text-center">{`${25}%`}</TableCell>
          <TableCell className="text-center">{`${25}%`}</TableCell>
          <TableCell className="text-center">{formatMoney(0)}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
