import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Shareholder } from "@/types/db";
import DeleteShareholderButton from "./delete-shareholder-button";
import { formatMoney } from "@/lib/utils";

export default async function ShareholdersTable({
  shareholders,
}: {
  shareholders: Shareholder[];
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-left">Name</TableHead>
          <TableHead className="text-center">Share Percentage</TableHead>
          <TableHead className="text-center">Insurance Coverage</TableHead>
          <TableHead className="text-right"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {shareholders.map((s) => (
          <TableRow key={s.id}>
            <TableCell className="text-center">{s.name}</TableCell>
            <TableCell className="text-center">
              {s.share_percentage + "%"}
            </TableCell>
            <TableCell className="text-center">
              {formatMoney(s.insurance_coverage)}
            </TableCell>
            <TableCell className="text-right">
              <DeleteShareholderButton businessId={s.business_id} id={s.id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
