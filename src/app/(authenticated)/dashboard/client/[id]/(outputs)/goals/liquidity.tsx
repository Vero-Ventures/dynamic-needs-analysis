"use client";

import { formatMoney } from "@/lib/utils";
import {
  calculateCurrentFutureTotals,
  calculateLiquidityAllocatedToGoals,
  calculateLiquidityPreserved,
  calculateSurplusShortfall,
  calculateTotalSumGoals,
} from "@/lib/goals/utils";
import GoalsChart from "./goals-chart";

export default function Liquidity({
  goals,
  assets,
  liquidityToGoalsPercent,
}: {
  goals: Goal[];
  assets: Asset[];
  liquidityToGoalsPercent: number;
}) {
  const {
    totalCurrentValueFixed,
    totalFutureValueFixed,
    totalCurrentValueLiquid,
    totalCurrentValueToBeSold,
    totalFutureValueLiquidAssets,
    totalFutureValueToBeSold,
  } = calculateCurrentFutureTotals(assets);

  const allocationFactor = liquidityToGoalsPercent / 100;

  const liquidityPreserved = calculateLiquidityPreserved(
    allocationFactor,
    totalFutureValueLiquidAssets
  );

  const liquidityAllocatedToGoals = calculateLiquidityAllocatedToGoals(
    allocationFactor,
    totalFutureValueLiquidAssets
  );

  const totalSumGoals = calculateTotalSumGoals(goals);

  const surplusShortfall = calculateSurplusShortfall(
    liquidityAllocatedToGoals,
    totalSumGoals
  );
  return (
    <>
      <section>
        <h2 className="mb-4 border-b-2 border-primary pb-4 text-xl font-bold text-primary">
          Liquidity
        </h2>
        <LiquidityTable
          data={[
            {
              label: "Total Current Value of Fixed Assets",
              totalAmount: formatMoney(totalCurrentValueFixed),
            },
            {
              label: "Total Future Value of Fixed Assets",
              totalAmount: formatMoney(totalFutureValueFixed),
            },
            {
              label: "Total Current Value of Liquid Assets",
              totalAmount: formatMoney(totalCurrentValueLiquid),
            },
            {
              label: "Total Future Value of Liquid Assets",
              totalAmount: formatMoney(totalFutureValueLiquidAssets),
            },
            {
              label: "Total Current Value of Assets to be Sold",
              totalAmount: formatMoney(totalCurrentValueToBeSold),
            },
            {
              label: "Total Future Value of Assets to be Sold",
              totalAmount: formatMoney(totalFutureValueToBeSold),
            },
            {
              label: "% Liquidity Allocated Towards Goals",
              totalAmount: `${liquidityToGoalsPercent}%`,
            },
            {
              label: "Liquidity Preserved",
              totalAmount: formatMoney(liquidityPreserved),
            },
            {
              label: "Liquidity Allocated Towards Goals",
              totalAmount: formatMoney(liquidityAllocatedToGoals),
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
      <div className="col-span-2">
        <GoalsChart
          totalFutureValueLiquidAssets={totalFutureValueLiquidAssets}
          liquidityPreserved={liquidityPreserved}
          liquidityAllocatedToGoals={liquidityAllocatedToGoals}
          totalSumGoals={totalSumGoals}
          surplusShortfall={surplusShortfall}
        />
      </div>
    </>
  );
}

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Asset, Goal } from "@/types/db";

export function LiquidityTable({
  data,
}: {
  data: { label: string; totalAmount: string }[];
}) {
  return (
    <Table className="w-fit">
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
