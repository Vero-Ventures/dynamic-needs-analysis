import type { AssetBeneficiary } from "@/app/dashboard/client/[id]/(chat)/assets/add/add-assets-stepper";
import type { Asset, Beneficiary, Business } from "@/app/data/db";

export function calculateTotalCurrentValue(
  assets: Asset[],
  businesses: Business[]
): number {
  const totalAssetValue: number = assets.reduce(
    (acc: number, asset: Asset) => acc + (asset.currentValue || 0),
    0
  );
  const totalBusinessValue: number = businesses.reduce(
    (acc: number, business: Business) => acc + (business.valuation || 0),
    0
  );
  return totalAssetValue + totalBusinessValue;
}

export function calculateTotalFutureValue(
  assets: Asset[],
  calculateFutureValue: (asset: Asset) => number
): number {
  return assets.reduce(
    (acc: number, asset: Asset) => acc + calculateFutureValue(asset),
    0
  );
}

export function calculateFutureValue(asset: Asset): number {
  return asset.currentValue * Math.pow(1 + asset.rate / 100, asset.term);
}

export function calculateBeneficiaryDistributions(
  assets: Asset[],
  calculateFutureValue: (asset: Asset) => number
): Record<string, number> {
  const distributions: Record<string, number> = {};

  assets.forEach((asset: Asset): void => {
    const futureValue: number = calculateFutureValue(asset);
    const totalAllocation: number = asset.assetBeneficiaries.reduce(
      (sum: number, beneficiary: AssetBeneficiary) => {
        if (beneficiary.isAssetAssigned) return sum + beneficiary.allocation;
        return sum;
      },
      0
    );
    asset.assetBeneficiaries.forEach((assetBeneficiary: Beneficiary): void => {
      const distribution: number =
        (assetBeneficiary.allocation / totalAllocation) * futureValue;
      distributions[assetBeneficiary.name] =
        (distributions[assetBeneficiary.name] || 0) + distribution;
    });
  });

  return distributions;
}

export function calculateIdealDistributions(
  beneficiaries: Beneficiary[]
): Record<string, number> {
  const idealDistributions: Record<string, number> = {};

  beneficiaries.forEach((beneficiary: Beneficiary): void => {
    idealDistributions[beneficiary.name] = beneficiary.allocation;
  });

  return idealDistributions;
}

export function calculateAdditionalMoneyRequired(
  idealDistributions: Record<string, number>,
  distributions: Record<string, number>
): Record<string, number> {
  const additionalMoneyRequired: Record<string, number> = {};

  const totalDesiredValue: number = Object.keys(idealDistributions).reduce(
    (total: number, beneficiaryName: string) => {
      const currentAmount: number = distributions?.[beneficiaryName] ?? 0;
      const idealPercentage: number = idealDistributions[beneficiaryName] / 100;
      const idealAmount: number = currentAmount / idealPercentage;
      return Math.max(total, idealAmount);
    },
    0
  );

  Object.keys(idealDistributions).forEach((beneficiaryName: string): void => {
    const currentAmount: number = distributions?.[beneficiaryName] ?? 0;
    const desiredPercentage: number = idealDistributions[beneficiaryName] / 100;
    const idealAmount: number = totalDesiredValue * desiredPercentage;
    additionalMoneyRequired[beneficiaryName] = Math.max(
      0,
      idealAmount - currentAmount
    );
  });

  return additionalMoneyRequired;
}

export function calculateTotalAdditionalMoneyRequired(
  additionalMoneyRequired: Record<string, number>
): number {
  return Object.values(additionalMoneyRequired).reduce(
    (total: number, amount: number) => total + amount,
    0
  );
}

export function calculateTotalPercentage(
  distributions: Record<string, number>,
  totalFutureValue: number
): number {
  const totalDistributions: number = Object.values(distributions ?? {}).reduce(
    (total: number, amount: number) => total + amount,
    0
  );
  return totalDistributions > 0
    ? (totalDistributions / totalFutureValue) * 100
    : 0;
}

export function calculateTotalIdealPercentage(
  idealDistributions: Record<string, number>
): number {
  return Object.values(idealDistributions).reduce(
    (total: number, percentage: number) => total + percentage,
    0
  );
}
