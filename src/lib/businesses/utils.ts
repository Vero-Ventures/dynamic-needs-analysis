import type { BusinessesWithShareholdersAndKeyPeople } from "@/data/businesses";
import type { Business, KeyPerson, Shareholder } from "@/types/db";

function validatePercentage(percentage: number, type: string): void {
  if (percentage < 0 || percentage > 100) {
    throw new Error(`${type} percentage must be between 0% and 100%`);
  }
}

export function calculateEbitdaContributionDollars(
  keyPerson: KeyPerson,
  ebitda: number
): number {
  const { ebitda_contribution_percentage: percentage } = keyPerson;
  validatePercentage(percentage, "EBITDA contribution");
  return ebitda * (percentage / 100);
}

export function calculateShareValue(
  shareholder: Shareholder,
  valuation: number
): number {
  const { share_percentage: percentage } = shareholder;
  validatePercentage(percentage, "Share");
  return (percentage / 100) * valuation;
}

export function calculateLiquidationDisparity(
  shareholder: Shareholder,
  valuation: number
): number {
  return (
    calculateShareValue(shareholder, valuation) - shareholder.insurance_coverage
  );
}

export function calculateTotalShareholderPercentageOwned(
  shareholders: Shareholder[]
): number {
  return shareholders.reduce(
    (acc, shareholder) => acc + shareholder.share_percentage,
    0
  );
}

export function calculateTotalEbitdaContributionPercentage(
  keyPeople: KeyPerson[]
): number {
  return keyPeople.reduce(
    (acc, keyPerson) => acc + keyPerson.ebitda_contribution_percentage,
    0
  );
}

export function calculateTotalMajorShareholderValue(
  shareholders: Shareholder[],
  valuation: number
): number {
  return shareholders.reduce(
    (acc: number, shareholder) =>
      acc + calculateShareValue(shareholder, valuation),
    0
  );
}

export function calculateTotalMajorShareholderInsurance(
  shareholders: Shareholder[]
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
  business: Business,
  keyPerson: KeyPerson
): number {
  return (
    (keyPerson.ebitda_contribution_percentage / 100) *
    business.ebitda *
    Math.pow(1 + business.appreciation_rate / 100, business.term)
  );
}

export function calculateFinalShareValue(
  business: Business,
  shareholder: Shareholder
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
  business: Business,
  keyPerson: KeyPerson
) {
  const contributions: number[] = [];
  for (let year: number = 0; year <= business.term; year++) {
    const compounded: number =
      (keyPerson.ebitda_contribution_percentage / 100) *
      business.ebitda *
      Math.pow(1 + business.appreciation_rate / 100, year);
    contributions.push(compounded);
  }
  return contributions;
}

export function generateEbitdaSeries(
  businesses: BusinessesWithShareholdersAndKeyPeople
) {
  const series: ApexAxisChartSeries = [];
  businesses.forEach((business) => {
    business.key_people.forEach((shareholder): void => {
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
      (shareholder.share_percentage / 100) *
      business.valuation *
      Math.pow(1 + business.appreciation_rate / 100, year);
    values.push(value);
  }
  return values;
}

export function generateShareValueSeries(
  businesses: BusinessesWithShareholdersAndKeyPeople
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

export function generateRandomShareholderId() {
  return Date.now() + Math.floor(Math.random() * 1000000);
}
