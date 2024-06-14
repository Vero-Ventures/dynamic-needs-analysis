"use client";

import type { AssetsWithBeneficiaries } from "@/data/assets";
import { generateRealDistributionSeriesAndLabels } from "@/lib/beneficiaries/utils";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

export default function RealBeneficiaryDistributionChart({
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
  const { series, labels } = generateRealDistributionSeriesAndLabels(assets);

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
          animations: {
            enabled: false,
          },
          toolbar: {
            show: false,
          },
        },
        dataLabels: {
          enabled: true,
        },
        title: { text: "Real Beneficiary Distribution" },
        legend: { position: "bottom" },
        labels,
        theme: {
          mode: chartTheme,
          palette: "palette3",
        },
        xaxis: { type: "category", categories: [] },
        yaxis: { title: { text: "" } },
        plotOptions: { bar: { horizontal: true } },
      }}
      series={series}
      type="pie"
      height={350}
    />
  );
}
