import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DeleteAssetButton from "@/components/delete-item-button";
import { formatMoney } from "@/lib/utils";

export default function AssetsTable() {
  return (
    <Table className="mx-auto max-w-3xl">
      <TableHeader>
        <TableRow>
          <TableHead className="text-center">Name</TableHead>
          <TableHead className="text-center">Year Acquired</TableHead>
          <TableHead className="text-center">Purchase Price</TableHead>
          <TableHead className="text-center">Current Value ($)</TableHead>
          <TableHead className="text-right"></TableHead>
          <TableHead className="text-right"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <AssetTableRow />
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell className="text-center">Total</TableCell>
          <TableCell></TableCell>
          <TableCell className="text-center">{formatMoney(100000)}</TableCell>
          <TableCell className="text-center">{formatMoney(150000)}</TableCell>
          <TableCell colSpan={2}></TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}

function AssetTableRow() {
  return (
    <TableRow>
      <TableCell className="text-center font-medium">AAPL Stock</TableCell>
      <TableCell className="text-center font-medium">2022</TableCell>
      <TableCell className="text-center font-medium">
        {formatMoney(100000)}
      </TableCell>
      <TableCell className="text-center font-medium">
        {formatMoney(150000)}
      </TableCell>
      <TableCell className="text-right">
        <DeleteAssetButton size="icon" />
      </TableCell>
    </TableRow>
  );
}
