import type { Asset } from "@/app/data/db";

export function calculateCurrentYearsHeld(yearAcquired: number): number {
  const currentYear: number = new Date().getFullYear();
  return currentYear - yearAcquired;
}

export function calculateCurrentGrowthDollars(
  initialValue: number,
  currentValue: number
): number {
  return currentValue - initialValue;
}

export function calculateCurrentGrowthPercentage(
  initialValue: number,
  currentValue: number
): number {
  return initialValue === 0 ? 0 : (currentValue / initialValue - 1) * 100;
}

export function calculateFutureValueDollars(
  currentValue: number,
  rate: number,
  term: number
): number {
  return currentValue * Math.pow(1 + rate / 100, term);
}

export function calculateFutureValueGrowthPercentage(
  futureValueDollars: number,
  initialValue: number
): number {
  return initialValue === 0 ? 0 : (futureValueDollars / initialValue - 1) * 100;
}

export function currentTaxLiabilityDollars(
  isTaxable: boolean,
  capitalGainsTaxRate: number,
  currentGrowthDollars: number
): number {
  if (!isTaxable) {
    return 0;
  }
  return currentGrowthDollars * (capitalGainsTaxRate / 100.0);
}

export function calculateFutureTaxLiabilityDollars(
  asset: Asset,
  futureValueDollars: number
): number {
  if (!asset.isTaxable) {
    return 0;
  }
  return (
    (futureValueDollars - asset.initialValue) *
    (asset.capitalGainsTaxRate / 100.0)
  );
}
