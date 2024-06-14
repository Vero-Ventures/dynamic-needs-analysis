import type { Tables } from "../../../types/supabase";
import type {
  AssetBeneficiary,
  AssetsWithBeneficiaries,
  SingleAssetWithBeneficiaries,
} from "@/data/assets";

export function generateDesiredDistributionSeriesAndLabels(
  beneficiaries: Tables<"beneficiaries">[]
) {
  const beneficiaryTotals: Record<string, number> = {};

  beneficiaries.forEach((beneficiary): void => {
    if (!beneficiaryTotals[beneficiary.name]) {
      beneficiaryTotals[beneficiary.name] = 0;
    }
    beneficiaryTotals[beneficiary.name] += beneficiary.allocation;
  });

  const series = Object.values(beneficiaryTotals);
  const labels = Object.keys(beneficiaryTotals);

  return { series, labels };
}

export function generateRealDistributionSeriesAndLabels(
  assets: AssetsWithBeneficiaries
) {
  const beneficiaryTotals: Record<string, number> = {};

  assets.forEach((asset: SingleAssetWithBeneficiaries): void => {
    asset.asset_beneficiaries.forEach((beneficiary: AssetBeneficiary): void => {
      if (beneficiary.beneficiaries) {
        if (!beneficiaryTotals[beneficiary.beneficiaries.name]) {
          beneficiaryTotals[beneficiary.beneficiaries.name] = 0;
        }
        beneficiaryTotals[beneficiary.beneficiaries.name] +=
          (beneficiary.allocation / 100) * asset.current_value;
      }
    });
  });

  const series = Object.values(beneficiaryTotals);
  const labels = Object.keys(beneficiaryTotals);

  return { series, labels };
}

export function generateAssetValueDistributionSeries(
  assets: AssetsWithBeneficiaries
) {
  const beneficiaryNames: string[] = [];
  const series: { name: string; data: number[] }[] = [];

  assets.forEach((asset: SingleAssetWithBeneficiaries): void => {
    asset.asset_beneficiaries.forEach((beneficiary: AssetBeneficiary): void => {
      if (
        beneficiary.beneficiaries &&
        !beneficiaryNames.includes(beneficiary.beneficiaries.name)
      ) {
        beneficiaryNames.push(beneficiary.beneficiaries.name);
        series.push({ name: beneficiary.beneficiaries.name, data: [] });
      }
    });
  });

  assets.forEach((asset: SingleAssetWithBeneficiaries): void => {
    series.forEach((series: { name: string; data: number[] }): void => {
      const beneficiary: AssetBeneficiary | undefined =
        asset.asset_beneficiaries.find(
          (b: AssetBeneficiary): boolean =>
            b.beneficiaries?.name === series.name
        );
      series.data.push(
        beneficiary ? (beneficiary.allocation / 100) * asset.current_value : 0
      );
    });
  });

  return series;
}
