import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatMoney } from "@/lib/utils";
import type { Business } from "@/types/db";

export default function BusinessTable({
  businesses,
}: {
  businesses: Business[];
}) {
  return (
    <Table className="w-fit">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[200px]">Name</TableHead>
          <TableHead>Valuation ($)</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {businesses.map((b) => (
          <TableRow key={b.name}>
            <TableCell className="font-medium">{b.name}</TableCell>
            <TableCell className="text-right">
              {formatMoney(b.valuation)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
