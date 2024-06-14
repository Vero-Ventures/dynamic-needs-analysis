import type { Business } from "@/app/data/db";
import type { Shareholder } from "@/app/data/db";
import type { Tables } from "../../../types/supabase";

export function calculateEbitdaContributionDollars(
  shareholder: Shareholder,
  ebitda: number
): number {
  return ebitda * (shareholder.ebitdaContributionPercentage / 100);
}

export function calculateShareValue(
  shareholder: Shareholder,
  valuation: number
): number {
  return (shareholder.sharePercentage / 100) * valuation;
}

export function calculateLiquidationDisparity(
  shareholder: Shareholder,
  valuation: number
): number {
  return (
    calculateShareValue(shareholder, valuation) - shareholder.insuranceCoverage
  );
}

export function calculateTotalShareholderPercentageOwned(
  shareholders: Shareholder[]
): number {
  return shareholders.reduce(
    (acc, shareholder) => acc + shareholder.sharePercentage,
    0
  );
}

export function calculateTotalEbitdaContributionPercentage(
  shareholders: Shareholder[]
): number {
  return shareholders.reduce(
    (acc, shareholder) => acc + shareholder.ebitdaContributionPercentage,
    0
  );
}

export function calculateTotalMajorShareholderValue(
  shareholders: Shareholder[],
  valuation: number
): number {
  return shareholders.reduce(
    (acc: number, shareholder: Shareholder) =>
      acc + calculateShareValue(shareholder, valuation),
    0
  );
}

export function calculateTotalMajorShareholderInsurance(
  shareholders: Shareholder[]
): number {
  return shareholders.reduce(
    (acc: number, shareholder: Shareholder) =>
      acc + shareholder.insuranceCoverage,
    0
  );
}

export function calculateTotalMajorShareholderDisparity(
  totalMajorShareholderValue: number,
  totalMajorShareholderInsurance: number
): number {
  return totalMajorShareholderValue - totalMajorShareholderInsurance;
}

export function calculateFinalEbitdaContribution(
  business: Business,
  shareholder: Shareholder
): number {
  return (
    (shareholder.ebitdaContributionPercentage / 100) *
    business.ebitda *
    Math.pow(1 + business.appreciationRate / 100, business.term)
  );
}

export function calculateFinalShareValue(
  business: Business,
  shareholder: Shareholder
): number {
  return (
    (shareholder.sharePercentage / 100) *
    business.valuation *
    Math.pow(1 + business.appreciationRate / 100, business.term)
  );
}

export function generateYearsArray(): string[] {
  const currentYear: number = new Date().getFullYear();
  return Array.from({ length: 50 }, (_, i: number) =>
    (currentYear + i).toString()
  );
}

export function calculateCompoundedEbitdaContribution(
  business: Business,
  shareholder: Shareholder
) {
  const contributions: number[] = [];
  for (let year: number = 0; year <= business.term; year++) {
    const compounded: number =
      (shareholder.ebitdaContributionPercentage / 100) *
      business.ebitda *
      Math.pow(1 + business.appreciationRate / 100, year);
    contributions.push(compounded);
  }
  return contributions;
}

export function generateEbitdaSeries(
  businesses: Business[]
): ApexAxisChartSeries {
  const series: ApexAxisChartSeries = [];
  businesses.forEach((business) => {
    business.shareholders.forEach((shareholder): void => {
      series.push({
        name: `${business.name} - ${shareholder.name}`,
        data: calculateCompoundedEbitdaContribution(business, shareholder),
      });
    });
  });
  return series;
}

export function calculateShareValueOverTime(
  business: Business,
  shareholder: Shareholder
): number[] {
  const values: number[] = [];
  for (let year: number = 0; year <= business.term; year++) {
    const value: number =
      (shareholder.sharePercentage / 100) *
      business.valuation *
      Math.pow(1 + business.appreciationRate / 100, year);
    values.push(value);
  }
  return values;
}

export function generateShareValueSeries(
  businesses: Tables<"businesses">[]
): ApexAxisChartSeries {
  const series: ApexAxisChartSeries = [];

  businesses.forEach((business) => {
    business.shareholders.forEach((shareholder) => {
      series.push({
        name: `${business.name} - ${shareholder.name}`,
        data: calculateShareValueOverTime(business, shareholder),
      });
    });
  });
  return series;
}
