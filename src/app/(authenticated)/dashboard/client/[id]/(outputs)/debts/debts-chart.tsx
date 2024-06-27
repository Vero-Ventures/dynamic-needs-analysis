"use client";

import { generateDebtsSeries } from "@/lib/debts/utils";
import { formatMoney } from "@/lib/utils";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import type { Debt } from "@/types/db";

export default function DebtsChart({ debts }: { debts: Debt[] }) {
  const [mounted, setMounted] = useState(false);
  const { theme, systemTheme } = useTheme();
  const chartTheme = theme
    ? theme === "system"
      ? systemTheme
      : (theme as "light" | "dark")
    : "dark";
  const { series, xAxisOptions } = generateDebtsSeries(debts);

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
          stacked: false,
        },
        xaxis: {
          type: "numeric",
          title: { text: "Years" },
          labels: {
            formatter: (value: string): string => {
              const yearValue: number = Math.round(parseFloat(value));
              return yearValue.toString();
            },
            ...xAxisOptions,
          },
        },
        yaxis: {
          title: { text: "Debt Value ($)" },
          labels: {
            formatter: (value: number): string => formatMoney(value),
          },
        },
        tooltip: {
          y: {
            formatter: (value: number): string => formatMoney(value),
          },
        },
        theme: {
          mode: chartTheme,
          palette: "palette3",
        },
        dataLabels: { enabled: false },
        legend: {
          position: "top",
        },
      }}
      series={series}
      type="line"
      height={350}
    />
  );
}
