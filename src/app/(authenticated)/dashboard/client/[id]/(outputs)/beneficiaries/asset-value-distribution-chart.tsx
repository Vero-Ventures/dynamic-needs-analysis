"use client";

import type {
  AssetsWithBeneficiaries,
  SingleAssetWithBeneficiaries,
} from "@/data/assets";
import { generateAssetValueDistributionSeries } from "@/lib/beneficiaries/utils";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

export default function AssetValueDistributionChart({
  assets,
}: {
  assets: AssetsWithBeneficiaries;
}) {
  const [mounted, setMounted] = useState(false);
  const { theme, systemTheme } = useTheme();
  const chartTheme = theme
    ? theme === "system"
      ? systemTheme
      : (theme as "light" | "dark")
    : "dark";
  const series = generateAssetValueDistributionSeries(assets);

  // Prevent hydration warnings
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

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
          categories: assets.map(
            (asset: SingleAssetWithBeneficiaries) => asset.name
          ),
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
        theme: {
          mode: chartTheme,
          palette: "palette3",
        },
        legend: { position: "bottom" },
        labels: [],
      }}
      series={series}
      type="bar"
      height={350}
    />
  );
}
