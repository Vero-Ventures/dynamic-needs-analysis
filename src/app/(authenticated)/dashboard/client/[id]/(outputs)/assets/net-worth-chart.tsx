"use client";

import { generateNetWorthSeries } from "@/lib/asset/utils";
import { formatMoney } from "@/lib/utils";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import type { Tables } from "../../../../../../../types/supabase";

export default function NetWorthChart({
  assets,
}: {
  assets: Tables<"assets">[];
}) {
  const [mounted, setMounted] = useState(false);
  const { theme, systemTheme } = useTheme();
  const chartTheme = theme
    ? theme === "system"
      ? systemTheme
      : (theme as "light" | "dark")
    : "dark";
  const { series, xAxisOptions } = generateNetWorthSeries(assets);
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
        theme: {
          mode: chartTheme,
          palette: "palette3",
        },
        xaxis: {
          type: "numeric",
          labels: {
            formatter: (value: string): string => {
              const valAsNumber: number = parseFloat(value);
              return isNaN(valAsNumber)
                ? value
                : Math.round(valAsNumber).toString().slice(-4);
            },
            ...xAxisOptions,
          },
        },
        yaxis: {
          labels: {
            formatter: (value: number): string => formatMoney(value),
          },
        },
        dataLabels: {
          enabled: false,
        },
        fill: {
          type: "solid",
        },
        legend: {
          position: "top",
          horizontalAlign: "left",
        },
        tooltip: {
          y: {
            formatter: (val: number): string => `$${val.toFixed(0)}`,
          },
        },
      }}
      series={series}
      type="line"
      height={350}
    />
  );
}
