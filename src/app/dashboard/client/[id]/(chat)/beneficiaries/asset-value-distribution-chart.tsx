"use client";

import type { Asset } from "@/app/data/db";
import { generateAssetValueDistributionSeries } from "@/lib/beneficiaries/utils";
import ReactApexChart from "react-apexcharts";

export default function AssetValueDistributionChart({
  assets,
}: {
  assets: Asset[];
}) {
  const series = generateAssetValueDistributionSeries(assets);
  return (
    <ReactApexChart
      options={{
        chart: {
          stacked: true,
          animations: {
            enabled: false,
          },
          toolbar: {
            show: false,
          },
        },
        plotOptions: { bar: { horizontal: true } },
        dataLabels: { enabled: false },
        xaxis: {
          type: "category",
          categories: assets.map((asset: Asset) => asset.name),
        },
        yaxis: {
          title: { text: "Asset Value" },
        },
        tooltip: {
          y: {
            formatter: (val: number): string => {
              return `$${val.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}`;
            },
          },
        },
        title: { text: "Asset Value Distribution" },
        legend: { position: "bottom" },
        labels: [],
      }}
      series={series}
      type="bar"
      height={350}
    />
  );
}
