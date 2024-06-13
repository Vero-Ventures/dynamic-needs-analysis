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

export function generateNetWorthSeries(assets: Asset[]) {
  const startYear: number = Math.min(
    ...assets.map((a: Asset) => a.yearAcquired)
  );
  const endYear: number = Math.max(
    ...assets.map((a: Asset) => a.yearAcquired + a.term)
  );

  let tickAmount: number = endYear - startYear + 1;
  while (tickAmount > 20) {
    tickAmount = tickAmount / 2;
  }
  const xAxisOptions = { min: startYear, max: endYear, tickAmount };

  const series = assets.map((asset: Asset) => ({
    name: asset.name,
    data: valueSeries(asset, startYear, endYear).map((yv) => [
      yv.year,
      yv.value,
    ]),
  }));

  return { series, xAxisOptions };
}

function valueAtYear(asset: Asset, yearGiven: number): number {
  const currentYear: number = new Date().getFullYear();
  if (yearGiven < asset.yearAcquired) {
    return 0;
  }
  if (currentYear === asset.yearAcquired) {
    return asset.initialValue;
  }
  if (asset.yearAcquired <= yearGiven && yearGiven <= currentYear) {
    return (
      asset.initialValue *
      Math.pow(
        asset.currentValue / asset.initialValue,
        (yearGiven - asset.yearAcquired) / (currentYear - asset.yearAcquired)
      )
    );
  }
  return (
    asset.currentValue * Math.pow(1 + asset.rate / 100, yearGiven - currentYear)
  );
}

function valueSeries(asset: Asset, startYear: number, endYear: number) {
  const series = [];
  for (
    let year: number = Math.max(startYear, asset.yearAcquired);
    year <= endYear;
    year++
  ) {
    series.push({ year: year, value: valueAtYear(asset, year) });
  }
  return series;
}
