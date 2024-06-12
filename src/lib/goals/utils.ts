import type { Asset, Goals } from "@/app/data/db";

export function calculateTotalSumGoals(data: Goals[]) {
  return data.reduce((total, goal) => total + goal.amount, 0);
}

export function calculateLiquidityPreserved(
  allocationFactor: number,
  totalFutureValueLiquid: number
): number {
  return totalFutureValueLiquid * (1 - allocationFactor);
}

export function calculateLiquidityAllocatedToGoals(
  allocationFactor: number,
  totalFutureValueLiquid: number
): number {
  return totalFutureValueLiquid * allocationFactor;
}

export function calculateSurplusShortfall(
  liquidityAllocated: number,
  totalSumGoals: number
): number {
  return liquidityAllocated - totalSumGoals;
}

export function calculateCurrentFutureTotals(assets: Asset[]) {
  const result = {
    totalCurrentValueFixed: 0,
    totalFutureValueFixed: 0,
    totalCurrentValueLiquid: 0,
    totalFutureValueLiquid: 0,
    totalCurrentValueToBeSold: 0,
    totalFutureValueToBeSold: 0,
  };
  assets.forEach((asset: Asset): void => {
    const futureValue: number =
      asset.currentValue * Math.pow(1 + asset.rate / 100, asset.term);

    if (asset.isLiquid) {
      result.totalCurrentValueLiquid += asset.currentValue;
      result.totalFutureValueLiquid += futureValue;
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
