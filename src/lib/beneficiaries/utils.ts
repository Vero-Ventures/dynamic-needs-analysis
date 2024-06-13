import type { AssetBeneficiary } from "@/app/dashboard/client/[id]/(chat)/assets/add/add-assets-stepper";
import type { Asset, Beneficiary } from "@/app/data/db";

export function generateDesiredDistributionSeriesAndLabels(
  beneficiaries: Beneficiary[]
) {
  const beneficiaryTotals: Record<string, number> = {};

  beneficiaries.forEach((beneficiary: Beneficiary): void => {
    if (!beneficiaryTotals[beneficiary.name]) {
      beneficiaryTotals[beneficiary.name] = 0;
    }
    beneficiaryTotals[beneficiary.name] += beneficiary.allocation;
  });

  const series = Object.values(beneficiaryTotals);
  const labels = Object.keys(beneficiaryTotals);

  return { series, labels };
}

export function generateRealDistributionSeriesAndLabels(assets: Asset[]) {
  const beneficiaryTotals: Record<string, number> = {};

  assets.forEach((asset: Asset): void => {
    asset.assetBeneficiaries.forEach((beneficiary: AssetBeneficiary): void => {
      if (!beneficiaryTotals[beneficiary.name]) {
        beneficiaryTotals[beneficiary.name] = 0;
      }
      beneficiaryTotals[beneficiary.name] +=
        (beneficiary.allocation / 100) * asset.currentValue;
    });
  });

  const series = Object.values(beneficiaryTotals);
  const labels = Object.keys(beneficiaryTotals);

  return { series, labels };
}

export function generateAssetValueDistributionSeries(assets: Asset[]) {
  const beneficiaryNames: string[] = [];
  const series: { name: string; data: number[] }[] = [];

  assets.forEach((asset: Asset): void => {
    asset.assetBeneficiaries.forEach((beneficiary: Beneficiary): void => {
      if (!beneficiaryNames.includes(beneficiary.name)) {
        beneficiaryNames.push(beneficiary.name);
        series.push({ name: beneficiary.name, data: [] });
      }
    });
  });

  assets.forEach((asset: Asset): void => {
    series.forEach((series: { name: string; data: number[] }): void => {
      const beneficiary: Beneficiary | undefined =
        asset.assetBeneficiaries.find(
          (b: Beneficiary): boolean => b.name === series.name
        );
      series.data.push(
        beneficiary ? (beneficiary.allocation / 100) * asset.currentValue : 0
      );
    });
  });

  return series;
}
