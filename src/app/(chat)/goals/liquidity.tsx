export default function Liquidity() {
  return (
    <section>
      <h2 className="mb-2 text-2xl font-bold">Liquidity</h2>
      <LiquidityTable />
    </section>
  );
}

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const liquidityData = [
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
    totalAmount: "$300.00",
  },
  {
    label: "Surplus / Shortfall",
    totalAmount: "-$150.00",
  },
];

export function LiquidityTable() {
  return (
    <Table>
      <TableHeader />
      <TableBody>
        {liquidityData.map((invoice) => (
          <TableRow key={invoice.label}>
            <TableCell>{invoice.label}:</TableCell>
            <TableCell className="text-right text-xl font-medium">
              {invoice.totalAmount}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter></TableFooter>
    </Table>
  );
}