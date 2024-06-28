import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { KeyPerson } from "@/types/db";
import DeleteKeyPersonButton from "./delete-key-person-button";
import { formatMoney } from "@/lib/utils";

export default async function KeyPeopleTable({
  keyPeople,
}: {
  keyPeople: KeyPerson[];
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-left">Name</TableHead>
          <TableHead className="text-center">% EBITDA Contributed</TableHead>
          <TableHead className="text-center">Insurance Coverage</TableHead>
          <TableHead className="text-right"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {keyPeople.map((kp) => (
          <TableRow key={kp.id}>
            <TableCell className="text-center">{kp.name}</TableCell>
            <TableCell className="text-center">
              {kp.ebitda_contribution_percentage + "%"}
            </TableCell>
            <TableCell className="text-center">
              {formatMoney(kp.insurance_coverage)}
            </TableCell>
            <TableCell className="text-right">
              <DeleteKeyPersonButton id={kp.id} businessId={kp.business_id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
