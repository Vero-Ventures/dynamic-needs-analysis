import type { Asset, Goal } from "@/app/data/db";

export function calculateTotalSumGoals(data: Goal[]) {
  return data.reduce((total, goal) => total + goal.amount, 0);
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

export function calculateCurrentFutureTotals(assets: Asset[]) {
  const result = {
    totalCurrentValueFixed: 0,
    totalFutureValueFixed: 0,
    totalCurrentValueLiquid: 0,
    totalFutureValueLiquidAssets: 0,
    totalCurrentValueToBeSold: 0,
    totalFutureValueToBeSold: 0,
  };
  assets.forEach((asset: Asset): void => {
    const futureValue: number =
      asset.currentValue * Math.pow(1 + asset.rate / 100, asset.term);

    if (asset.isLiquid) {
      result.totalCurrentValueLiquid += asset.currentValue;
      result.totalFutureValueLiquidAssets += futureValue;
    }

    if (!asset.isLiquid && !asset.isToBeSold) {
      result.totalCurrentValueFixed += asset.currentValue;
      result.totalFutureValueFixed += futureValue;
    }

    if (asset.isToBeSold) {
      result.totalCurrentValueToBeSold += asset.currentValue;
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
