import { shareholders } from "@/app/data/db";
import DeleteItemButton from "@/components/delete-item-button";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { deleteShareholder } from "./actions";
import { formatMoney } from "@/lib/utils";

export function ShareholderTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Name</TableHead>
          <TableHead>Share Percentage (%)</TableHead>
          <TableHead>Insurance Coverage ($)</TableHead>
          <TableHead>% EBITDA Contribution</TableHead>
          <TableHead>$ EBITDA Contribution</TableHead>
          <TableHead>Share Value ($)</TableHead>
          <TableHead>Liquidation Disparity ($)</TableHead>
          <TableHead className="text-right"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {shareholders.map((shareholder) => (
          <TableRow key={shareholder.id}>
            <TableCell className="w-[150px] font-medium">
              {shareholder.name}
            </TableCell>
            <TableCell>{shareholder.sharePercentage}%</TableCell>
            <TableCell>{formatMoney(shareholder.insuranceCoverage)}</TableCell>
            <TableCell>{shareholder.ebitdaContributionPercentage}%</TableCell>
            <TableCell>{formatMoney(shareholder.ebitdaContribution)}</TableCell>
            <TableCell>{formatMoney(shareholder.shareValue)}</TableCell>
            <TableCell>
              {formatMoney(shareholder.liquidationDisparity)}
            </TableCell>
            <TableCell className="text-right">
              <DeleteShareholder id={shareholder.id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell>Total</TableCell>
          <TableCell>0%</TableCell>
          <TableCell>0%</TableCell>
          <TableCell>0%</TableCell>
          <TableCell>0%</TableCell>
          <TableCell>0%</TableCell>
          <TableCell>0%</TableCell>
          <TableCell></TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}

function DeleteShareholder({ id }: { id: number }) {
  const deleteShareholderWithBind = deleteShareholder.bind(null, id);
  return (
    <form action={deleteShareholderWithBind}>
      <DeleteItemButton />
    </form>
  );
}
