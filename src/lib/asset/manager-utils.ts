import type { Tables } from "../../../types/supabase";
import type {
  AssetsWithBeneficiaries,
  SingleAssetWithBeneficiaries,
  AssetBeneficiary,
} from "@/data/assets";

export function calculateTotalCurrentValue(
  assets: Tables<"assets">[],
  businesses: Tables<"businesses">[]
): number {
  const totalAssetValue: number = assets.reduce(
    (acc: number, asset: Tables<"assets">) => acc + (asset.current_value || 0),
    0
  );
  const totalBusinessValue: number = businesses.reduce(
    (acc: number, business: Tables<"businesses">) =>
      acc + (business.valuation || 0),
    0
  );
  return totalAssetValue + totalBusinessValue;
}

export function calculateTotalFutureValue(
  assets: Tables<"assets">[],
  calculateFutureValue: (asset: Tables<"assets">) => number
): number {
  return assets.reduce(
    (acc: number, asset: Tables<"assets">) => acc + calculateFutureValue(asset),
    0
  );
}

export function calculateFutureValue(asset: Tables<"assets">): number {
  return asset.current_value * Math.pow(1 + asset.rate / 100, asset.term);
}

export function calculateBeneficiaryDistributions(
  assets: AssetsWithBeneficiaries,
  calculateFutureValue: (asset: Tables<"assets">) => number
): Record<string, number> {
  const distributions: Record<string, number> = {};

  assets.forEach((asset: SingleAssetWithBeneficiaries): void => {
    const futureValue: number = calculateFutureValue(asset);

    // Filter out beneficiaries that have already been assigned
    const filteredAssetBeneficiaries = asset.asset_beneficiaries.filter(
      (assetBeneficiary) => assetBeneficiary.already_assigned
    );
    const totalAllocation: number = filteredAssetBeneficiaries.reduce(
      (sum: number, beneficiary: { allocation: number }) =>
        sum + beneficiary.allocation,
      0
    );
    filteredAssetBeneficiaries.forEach(
      (assetBeneficiary: AssetBeneficiary): void => {
        const distribution: number =
          (assetBeneficiary.allocation / totalAllocation) * futureValue;

        if (assetBeneficiary.beneficiaries) {
          distributions[assetBeneficiary.beneficiaries.name] =
            (distributions[assetBeneficiary.beneficiaries.name] || 0) +
            distribution;
        }
      }
    );
  });

  return distributions;
}

export function calculateIdealDistributions(
  beneficiaries: Tables<"beneficiaries">[]
): Record<string, number> {
  const idealDistributions: Record<string, number> = {};

  beneficiaries.forEach((beneficiary: Tables<"beneficiaries">): void => {
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
