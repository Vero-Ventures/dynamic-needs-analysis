import type { Shareholder } from "@/app/data/db";
import DeleteItemButton from "@/components/delete-item-button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { formatMoney } from "@/lib/utils";
import {
  calculateEbitdaContributionDollars,
  calculateLiquidationDisparity,
  calculateShareValue,
} from "@/lib/businesses/utils";
import { useState } from "react";

export function ShareholderTable({
  shareholders,
  valuation,
  ebitda,
  onDeleteShareholder,
}: {
  shareholders: Shareholder[];
  valuation: number;
  ebitda: number;
  onDeleteShareholder: (id: number) => void;
}) {
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
            <TableCell>
              {formatMoney(
                calculateEbitdaContributionDollars(shareholder, ebitda)
              )}
            </TableCell>
            <TableCell>
              {formatMoney(calculateShareValue(shareholder, valuation))}
            </TableCell>
            <TableCell>
              {formatMoney(
                calculateLiquidationDisparity(shareholder, valuation)
              )}
            </TableCell>
            <TableCell className="text-right">
              <DeleteShareholder
                onDeleteShareholder={onDeleteShareholder}
                id={shareholder.id}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function DeleteShareholder({
  id,
  onDeleteShareholder,
}: {
  id: number;
  onDeleteShareholder: (id: number) => void;
}) {
  const [isPending, setIsPending] = useState(false);
  function handleDeleteShareholder() {
    setIsPending(true);
    onDeleteShareholder(id);
    setIsPending(false);
  }
  return (
    <DeleteItemButton isPending={isPending} onClick={handleDeleteShareholder} />
  );
}

export function TotalShareholderTable({
  data,
}: {
  data: {
    label: string;
    totalAmount: string;
  }[];
}) {
  return (
    <Table className="max-w-lg">
      <TableHeader />
      <TableBody>
        {data.map((item) => (
          <TableRow key={item.label}>
            <TableCell>{item.label}:</TableCell>
            <TableCell className="text-right text-xl font-medium">
              {item.totalAmount}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
