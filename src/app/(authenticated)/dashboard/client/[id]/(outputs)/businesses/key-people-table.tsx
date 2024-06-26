import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { KeyPerson } from "@/types/db";

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
          <TableHead className="text-right">Insurance Coverage</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {keyPeople.length > 0 ? (
          keyPeople.map((kp) => (
            <TableRow key={kp.id}>
              <TableCell className="text-center">{kp.name}</TableCell>
              <TableCell className="text-center">
                {kp.ebitda_contribution_percentage}
              </TableCell>
              <TableCell className="text-right">
                {kp.insurance_coverage}
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell className="text-center" colSpan={3}>
              No key person.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
