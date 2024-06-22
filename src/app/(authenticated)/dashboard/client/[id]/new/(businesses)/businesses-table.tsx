import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { BusinessWithShareholdersAndKeyPeople } from "./businesses";
import DeleteItemButton from "@/components/delete-item-button";

export default function BusinessesTable({
  businesses,
  onDeleteBusinessWithShareholder,
}: {
  businesses: BusinessWithShareholdersAndKeyPeople[];
  onDeleteBusinessWithShareholder: (id: number) => void;
}) {
  return (
    <Table className="mx-auto max-w-3xl">
      <TableHeader>
        <TableRow>
          <TableHead className="text-left">Name</TableHead>
          <TableHead className="text-center">Market Value</TableHead>
          <TableHead className="text-center">Growth Rate</TableHead>
          <TableHead className="text-center">Time horizon</TableHead>
          <TableHead className="text-right"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {businesses.map((b) => (
          <TableRow key={b.id}>
            <TableCell className="text-center">{b.name}</TableCell>
            <TableCell className="text-center">{b.valuation}</TableCell>
            <TableCell className="text-center">{b.appreciation_rate}</TableCell>
            <TableCell className="text-center">{b.term}</TableCell>
            <TableCell className="text-right">
              <DeleteItemButton
                onClick={() => onDeleteBusinessWithShareholder(b.id)}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
