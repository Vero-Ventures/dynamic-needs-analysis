"use client";

import { formatMoney } from "@/lib/utils";
import {
  calculateCurrentFutureTotals,
  calculateLiquidityAllocatedToGoals,
  calculateLiquidityPreserved,
  calculateSurplusShortfall,
  calculateTotalSumGoals,
} from "@/lib/goals/utils";

import type { Asset, Goal } from "@/types/db";

import StatCard from "@/components/stat-card";
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
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <StatCard
            value={formatMoney(totalCurrentValueFixed)}
            description="Total Current Value of Fixed Assets"
          />
          <StatCard
            value={formatMoney(totalFutureValueFixed)}
            description="Total Future Value of Fixed Assets"
          />
          <StatCard
            value={formatMoney(totalCurrentValueLiquid)}
            description="Total Current Value of Liquid Assets"
          />
          <StatCard
            value={formatMoney(totalFutureValueLiquidAssets)}
            description="Total Future Value of Liquid Assets"
          />
          <StatCard
            value={formatMoney(totalCurrentValueToBeSold)}
            description="Total Current Value of Assets to be Sold"
          />
          <StatCard
            value={formatMoney(totalFutureValueToBeSold)}
            description="Total Future Value of Assets to be Sold"
          />
          <StatCard
            value={`${liquidityToGoalsPercent}%`}
            description="% Liquidity Allocated Towards Goals"
          />
          <StatCard
            value={formatMoney(liquidityAllocatedToGoals)}
            description="Liquidity Allocated Towards Goals"
          />
          <StatCard
            value={formatMoney(liquidityPreserved)}
            description="Liquidity Preserved"
          />
          <StatCard
            value={formatMoney(totalSumGoals)}
            description="Total Sum of All Goals"
          />
          <StatCard
            value={formatMoney(surplusShortfall)}
            description="Surplus / Shortfall"
          />
        </div>
      </section>
      <div className="mt-6">
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
