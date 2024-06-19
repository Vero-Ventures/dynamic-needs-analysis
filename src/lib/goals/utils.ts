import type { Tables } from "../../types/supabase";

export function calculateTotalSumGoals(goals: Tables<"goals">[]) {
  return goals.reduce((total, goal) => total + goal.amount, 0);
}

export function calculateLiquidityPreserved(
  allocationFactor: number,
  totalFutureValueLiquidAssets: number
): number {
  return totalFutureValueLiquidAssets * (1 - allocationFactor);
}

export function calculateLiquidityAllocatedToGoals(
  allocationFactor: number,
  totalFutureValueLiquidAssets: number
): number {
  return totalFutureValueLiquidAssets * allocationFactor;
}

export function calculateSurplusShortfall(
  liquidityAllocatedToGoals: number,
  totalSumGoals: number
): number {
  return liquidityAllocatedToGoals - totalSumGoals;
}

export function calculateCurrentFutureTotals(assets: Tables<"assets">[]) {
  const result = {
    totalCurrentValueFixed: 0,
    totalFutureValueFixed: 0,
    totalCurrentValueLiquid: 0,
    totalFutureValueLiquidAssets: 0,
    totalCurrentValueToBeSold: 0,
    totalFutureValueToBeSold: 0,
  };
  assets.forEach((asset): void => {
    const futureValue: number =
      asset.current_value * Math.pow(1 + asset.rate / 100, asset.term);

    if (asset.is_liquid) {
      result.totalCurrentValueLiquid += asset.current_value;
      result.totalFutureValueLiquidAssets += futureValue;
    }

    if (!asset.is_liquid && !asset.to_be_sold) {
      result.totalCurrentValueFixed += asset.current_value;
      result.totalFutureValueFixed += futureValue;
    }

    if (asset.to_be_sold) {
      result.totalCurrentValueToBeSold += asset.current_value;
      result.totalFutureValueToBeSold += futureValue;
    }
  });
  return result;
}

export function generateGoalsSeries(
  values: number[],
  categories: string[],
  positiveColor: string,
  negativeColor: string
) {
  return values.map((value: number, index: number) => {
    return {
      x: categories[index],
      y: value,
      fillColor: value >= 0 ? positiveColor : negativeColor,
    };
  });
}
