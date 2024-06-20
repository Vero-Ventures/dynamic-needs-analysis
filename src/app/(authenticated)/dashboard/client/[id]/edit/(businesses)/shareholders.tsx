import DeleteItemButton from "@/components/delete-item-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Shareholders() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Shareholders</CardTitle>
      </CardHeader>
      <CardContent>
        <Table className="mx-auto max-w-3xl">
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Insurance coverage</TableHead>
              <TableHead>% of business owned</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>
                <Input placeholder="Enter name" />
              </TableCell>
              <TableCell>
                <Input placeholder="0" />
              </TableCell>
              <TableCell>
                <Input placeholder="0" />
              </TableCell>
              <TableCell>
                <DeleteItemButton />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
