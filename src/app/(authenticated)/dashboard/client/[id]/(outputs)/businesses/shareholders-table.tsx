import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatMoney } from "@/lib/utils";
import type { Shareholder } from "@/types/db";

export default async function ShareholdersTable({
  shareholders,
}: {
  shareholders: Shareholder[];
}) {
  return (
    <Table className="w-fit">
      <TableHeader>
        <TableRow>
          <TableHead className="text-center">Name</TableHead>
          <TableHead className="text-center">Share Percentage</TableHead>
          <TableHead className="text-center">Insurance Coverage</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {shareholders.length > 0 ? (
          shareholders.map((s) => (
            <TableRow key={s.id}>
              <TableCell className="text-center">{s.name}</TableCell>
              <TableCell className="text-center">
                {s.share_percentage}
              </TableCell>
              <TableCell className="text-right">
                {formatMoney(s.insurance_coverage)}
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell className="text-center" colSpan={3}>
              No shareholders.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
