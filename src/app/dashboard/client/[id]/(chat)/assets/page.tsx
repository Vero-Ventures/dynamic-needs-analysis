import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function Assets() {
  return (
    <div className="p-4">
      <Link
        className={cn(buttonVariants())}
        href="/dashboard/client/1/assets/add"
      >
        Add New Asset
      </Link>
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

function AssetsTable() {
  return (
    <Table className="max-w-lg">
      <TableHeader>
        <TableRow>
          <TableHead className="text-center">Name</TableHead>
          <TableHead className="text-center">Current Value ($)</TableHead>
          <TableHead className="text-center">
            Future Tax Liability ($)
          </TableHead>
          <TableHead className="text-right"></TableHead>
          <TableHead className="text-right"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">{"AAPL"}</TableCell>
          <TableCell className="text-center">{formatMoney(110)}</TableCell>
          <TableCell className="text-center">{formatMoney(23.21)}</TableCell>
          <TableCell>
            <Link
              href={`/dashboard/client/1/assets/edit/${0}`}
              className="hover:cursor-pointer"
            >
              <SquarePenIcon />
            </Link>
          </TableCell>
          <TableCell>
            <DeleteAsset id={0} />
          </TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell>Total</TableCell>
          <TableCell className="text-center">{formatMoney(110)}</TableCell>
          <TableCell className="text-center">{formatMoney(23.21)}</TableCell>
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
    <Table className="max-w-lg">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[200px]">Beneficiary</TableHead>
          <TableHead className="text-center">Amount ($)</TableHead>
          <TableHead className="text-center">Percentage (%)</TableHead>
          <TableHead className="text-center">Ideal Distribution (%)</TableHead>
          <TableHead className="text-center">Additional Required ($)</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">{"John Harrison"}</TableCell>
          <TableCell className="text-center">{formatMoney(8474.75)}</TableCell>
          <TableCell className="text-center">{`${25}%`}</TableCell>
          <TableCell className="text-center">{`${25}%`}</TableCell>
          <TableCell className="text-center">{formatMoney(0)}</TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell>Total</TableCell>
          <TableCell className="text-center">{formatMoney(8474.75)}</TableCell>
          <TableCell className="text-center">{`${25}%`}</TableCell>
          <TableCell className="text-center">{`${25}%`}</TableCell>
          <TableCell className="text-center">{formatMoney(0)}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
