"use client";

import type { Beneficiary } from "@/app/data/db";
import { generateDesiredDistributionSeriesAndLabels } from "@/lib/beneficiaries/utils";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

export default function DesiredBeneficiaryDistributionChart({
  beneficiaries,
}: {
  beneficiaries: Beneficiary[];
}) {
  const [mounted, setMounted] = useState(false);
  const { theme, systemTheme } = useTheme();
  const chartTheme = theme
    ? theme === "system"
      ? systemTheme
      : (theme as "light" | "dark")
    : "dark";

  console.log(chartTheme);
  const { series, labels } =
    generateDesiredDistributionSeriesAndLabels(beneficiaries);

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
        theme: {
          mode: chartTheme,
          palette: "palette3",
        },
        title: { text: "Desired Beneficiary Distribution" },
        legend: { position: "bottom" },
        labels,
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
