"use client";

import { formatMoney } from "@/lib/utils";
import {
  calculateCurrentFutureTotals,
  calculateLiquidityAllocatedToGoals,
  calculateLiquidityPreserved,
  calculateSurplusShortfall,
  calculateTotalSumGoals,
} from "@/lib/goals/utils";
import type { Asset, Goal } from "@/app/data/db";
import { useState } from "react";

export default function Liquidity({
  goals,
  assets,
}: {
  goals: Goal[];
  assets: Asset[];
}) {
  const [liquidityToGoalsPercent, setLiquidityToGoalsPercent] = useState(0);
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
        <h2 className="mb-2 text-2xl font-bold">Liquidity</h2>
        <div className="flex items-center gap-2">
          <Label>% Liquidity Allocated to Goals:</Label>
          <Input
            type="number"
            value={liquidityAllocatedToGoals}
            onChange={(e) => setLiquidityToGoalsPercent(+e.target.value)}
          />
        </div>
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
import GoalsChart from "./goals-chart";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

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
