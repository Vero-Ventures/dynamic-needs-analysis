import type { Business } from "@/app/data/db";
import type { Shareholder } from "@/app/data/db";

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
