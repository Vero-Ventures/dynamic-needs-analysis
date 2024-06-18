import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import EBITDAContributionChart from "./ebitda-contribution-chart";
import ShareValueChart from "./share-value-chart";

export const dynamic = "force-dynamic";

export default async function Businesses() {
  const businesses = await getBusinessesWithShareholders();
  if (!businesses) {
    return notFound();
  }
  return (
    <div className="space-y-6 p-4">
      <Link
        className={cn(buttonVariants())}
        href="/dashboard/client/1/businesses/add"
      >
        Add New Business
      </Link>
      <div>
        <BusinessTable businesses={businesses} />
      </div>
      <div>
        <EBITDAContributionChart businesses={businesses} />
      </div>
      <div>
        <ShareValueChart businesses={businesses} />
      </div>
    </div>
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
import DeleteItemButton from "@/components/delete-item-button";
import { deleteBusiness } from "./add/actions";
import { cn, formatMoney } from "@/lib/utils";
import { SquarePenIcon } from "lucide-react";
import type { Tables } from "../../../../../../../types/supabase";
import { notFound } from "next/navigation";
import { getBusinessesWithShareholders } from "@/data/businesses";

function BusinessTable({ businesses }: { businesses: Tables<"businesses">[] }) {
  return (
    <Table className="max-w-lg">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[200px]">Name</TableHead>
          <TableHead>Valuation ($)</TableHead>
          <TableHead className="text-right"></TableHead>
          <TableHead className="text-right"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {businesses.map((b) => (
          <TableRow key={b.name}>
            <TableCell className="font-medium">{b.name}</TableCell>
            <TableCell>{formatMoney(b.valuation)}</TableCell>
            <TableCell>
              <Link
                href={`/dashboard/client/1/businesses/edit/${b.id}`}
                className="hover:cursor-pointer"
              >
                <SquarePenIcon />
              </Link>
            </TableCell>
            <TableCell>
              <DeleteBusiness id={b.id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function DeleteBusiness({ id }: { id: number }) {
  const deleteBusinessWithBind = deleteBusiness.bind(null, id);
  return (
    <form action={deleteBusinessWithBind}>
      <DeleteItemButton />
    </form>
  );
}
