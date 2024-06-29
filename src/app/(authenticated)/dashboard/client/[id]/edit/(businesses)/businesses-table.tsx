import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { createClient } from "@/lib/supabase/server";
import DeleteBusinessButton from "./delete-business-button";
import { formatMoney } from "@/lib/utils";
import EditBusinessDialog from "./edit-business-dialog";

export default async function BusinessesTable({
  clientId,
}: {
  clientId: number;
}) {
  const sb = await createClient();
  const { data: businesses, error } = await sb
    .from("businesses")
    .select()
    .eq("client_id", clientId);

  if (error) {
    // handle error
  }
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-left">Name</TableHead>
          <TableHead className="text-center">Market Value</TableHead>
          <TableHead className="text-center">Growth Rate</TableHead>
          <TableHead className="text-center">Time horizon</TableHead>
          <TableHead className="text-center"></TableHead>
          <TableHead className="text-center"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {businesses?.map((b) => (
          <TableRow key={b.id}>
            <TableCell className="text-center">{b.name}</TableCell>
            <TableCell className="text-center">
              {formatMoney(b.valuation)}
            </TableCell>
            <TableCell className="text-center">
              {b.appreciation_rate + "%"}
            </TableCell>
            <TableCell className="text-center">{b.term + " years"}</TableCell>
            <TableCell className="text-right">
              <EditBusinessDialog business={b} />
            </TableCell>
            <TableCell className="text-right">
              <DeleteBusinessButton id={b.id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
