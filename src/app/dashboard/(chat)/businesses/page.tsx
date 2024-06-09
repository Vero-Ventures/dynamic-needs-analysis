import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Businesses() {
  return (
    <div className="p-4">
      <Link href="/businesses/add">
        <Button>Add New Business</Button>
      </Link>
      <div className="mt-4">
        <BusinessTable />
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
import { businesses } from "@/app/data/db";
import DeleteItemButton from "@/components/delete-item-button";
import { deleteBusiness } from "./add/actions";
import { formatMoney } from "@/lib/utils";

function BusinessTable() {
  return (
    <Table className="max-w-lg">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[200px]">Name</TableHead>
          <TableHead>Valuation ($)</TableHead>
          <TableHead className="text-right"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {businesses.map((b) => (
          <TableRow key={b.name}>
            <TableCell className="font-medium">{b.name}</TableCell>
            <TableCell>{formatMoney(b.valuation)}</TableCell>
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
