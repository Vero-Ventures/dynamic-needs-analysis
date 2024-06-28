import { Asset } from "@/types/db";

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
  const startYear: number = Math.min(...assets.map((a) => a.year_acquired));
  const endYear: number = Math.max(
    ...assets.map((a) => a.year_acquired + a.term)
  );

  let tickAmount: number = endYear - startYear + 1;
  while (tickAmount > 20) {
    tickAmount = tickAmount / 2;
  }
  const xAxisOptions = { min: startYear, max: endYear, tickAmount };

  const series = assets.map((asset) => ({
    name: asset.name,
    data: valueSeries(asset, startYear, endYear).map((yv) => [
      yv.year,
      yv.value,
    ]),
  }));

  return { series, xAxisOptions };
}

export function valueAtYear(asset: Asset, yearGiven: number): number {
  const currentYear: number = new Date().getFullYear();
  if (yearGiven < asset.year_acquired) {
    return 0;
  }
  if (currentYear === asset.year_acquired) {
    return asset.initial_value;
  }
  if (asset.year_acquired <= yearGiven && yearGiven <= currentYear) {
    return (
      asset.initial_value *
      Math.pow(
        asset.current_value / asset.initial_value,
        (yearGiven - asset.year_acquired) / (currentYear - asset.year_acquired)
      )
    );
  }
  return (
    asset.current_value *
    Math.pow(1 + asset.rate / 100, yearGiven - currentYear)
  );
}

function valueSeries(asset: Asset, startYear: number, endYear: number) {
  const series = [];
  for (
    let year: number = Math.max(startYear, asset.year_acquired);
    year <= endYear;
    year++
  ) {
    series.push({ year: year, value: valueAtYear(asset, year) });
  }
  return series;
}
export function generateDiversificationSeries(assets: Asset[]) {
  const totalByType: Record<string, number> = {};

  assets.forEach((asset): void => {
    totalByType[asset.type] =
      (totalByType[asset.type] || 0) + asset.current_value;
  });

  const series = Object.values(totalByType);
  const labels = Object.keys(totalByType);

  return { series, labels };
}
