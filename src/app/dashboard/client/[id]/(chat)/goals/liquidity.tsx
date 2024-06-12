import { goals } from "@/app/data/db";
import {
  calculateSurplusShortfall,
  calculateTotalSumGoals,
} from "@/lib/goals/utils";

import { formatMoney } from "@/lib/utils";

export default function Liquidity() {
  const totalSumGoals = calculateTotalSumGoals(goals);
  const surplusShortfall = calculateSurplusShortfall(0, totalSumGoals);
  return (
    <section>
      <h2 className="mb-2 text-2xl font-bold">Liquidity</h2>
      <LiquidityTable
        data={[
          {
            label: "Total Current Value of Fixed Assets",
            totalAmount: "$250.00",
          },
          {
            label: "Total Future Value of Fixed Assets",
            totalAmount: "$150.00",
          },
          {
            label: "Total Current Value of Liquid Assets",
            totalAmount: "$350.00",
          },
          {
            label: "Total Future Value of Liquid Assets",
            totalAmount: "$450.00",
          },
          {
            label: "Total Current Value of Assets to be Sold",
            totalAmount: "$550.00",
          },
          {
            label: "Total Future Value of Assets to be Sold",
            totalAmount: "$200.00",
          },
          {
            label: "% Liquidity Allocated Towards Goals",
            totalAmount: "10%",
          },
          {
            label: "Liquidity Preserved",
            totalAmount: "$300.00",
          },
          {
            label: "Liquidity Allocated Towards Goals",
            totalAmount: "$300.00",
          },
          {
            label: "Total Sum of All Goals",
            totalAmount: formatMoney(totalSumGoals),
          },
          {
            label: "Surplus / Shortfall",
            totalAmount: formatMoney(surplusShortfall),
          },
        ]}
      />
    </section>
  );
}

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function LiquidityTable({
  data,
}: {
  data: { label: string; totalAmount: string }[];
}) {
  return (
    <Table>
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
