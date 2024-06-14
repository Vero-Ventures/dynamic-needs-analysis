import type { BusinessesWithShareholders } from "@/data/businesses";
import type { Tables } from "../../../types/supabase";

export function calculateEbitdaContributionDollars(
  shareholder: Tables<"shareholders">,
  ebitda: number
): number {
  return ebitda * (shareholder.ebitda_contribution_percentage / 100);
}

export function calculateShareValue(
  shareholder: Tables<"shareholders">,
  valuation: number
): number {
  return (shareholder.share_percentage / 100) * valuation;
}

export function calculateLiquidationDisparity(
  shareholder: Tables<"shareholders">,
  valuation: number
): number {
  return (
    calculateShareValue(shareholder, valuation) - shareholder.insurance_coverage
  );
}

export function calculateTotalShareholderPercentageOwned(
  shareholders: Tables<"shareholders">[]
): number {
  return shareholders.reduce(
    (acc, shareholder) => acc + shareholder.share_percentage,
    0
  );
}

export function calculateTotalEbitdaContributionPercentage(
  shareholders: Tables<"shareholders">[]
): number {
  return shareholders.reduce(
    (acc, shareholder) => acc + shareholder.ebitda_contribution_percentage,
    0
  );
}

export function calculateTotalMajorShareholderValue(
  shareholders: Tables<"shareholders">[],
  valuation: number
): number {
  return shareholders.reduce(
    (acc: number, shareholder) =>
      acc + calculateShareValue(shareholder, valuation),
    0
  );
}

export function calculateTotalMajorShareholderInsurance(
  shareholders: Tables<"shareholders">[]
): number {
  return shareholders.reduce(
    (acc: number, shareholder) => acc + shareholder.insurance_coverage,
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
  business: Tables<"businesses">,
  shareholder: Tables<"shareholders">
): number {
  return (
    (shareholder.ebitda_contribution_percentage / 100) *
    business.ebitda *
    Math.pow(1 + business.appreciation_rate / 100, business.term)
  );
}

export function calculateFinalShareValue(
  business: Tables<"businesses">,
  shareholder: Tables<"shareholders">
): number {
  return (
    (shareholder.share_percentage / 100) *
    business.valuation *
    Math.pow(1 + business.appreciation_rate / 100, business.term)
  );
}

export function generateYearsArray(): string[] {
  const currentYear: number = new Date().getFullYear();
  return Array.from({ length: 50 }, (_, i: number) =>
    (currentYear + i).toString()
  );
}

export function calculateCompoundedEbitdaContribution(
  business: Tables<"businesses">,
  shareholder: Tables<"shareholders">
) {
  const contributions: number[] = [];
  for (let year: number = 0; year <= business.term; year++) {
    const compounded: number =
      (shareholder.ebitda_contribution_percentage / 100) *
      business.ebitda *
      Math.pow(1 + business.appreciation_rate / 100, year);
    contributions.push(compounded);
  }
  return contributions;
}

export function generateEbitdaSeries(
  businesses: BusinessesWithShareholders
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
  business: Tables<"businesses">,
  shareholder: Tables<"shareholders">
): number[] {
  const values: number[] = [];
  for (let year: number = 0; year <= business.term; year++) {
    const value: number =
      (shareholder.share_percentage / 100) *
      business.valuation *
      Math.pow(1 + business.appreciation_rate / 100, year);
    values.push(value);
  }
  return values;
}

export function generateShareValueSeries(
  businesses: BusinessesWithShareholders
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
