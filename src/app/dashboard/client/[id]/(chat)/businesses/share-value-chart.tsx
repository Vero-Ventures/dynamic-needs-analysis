"use client";
import {
  generateShareValueSeries,
  generateYearsArray,
} from "@/lib/businesses/utils";
import { formatMoney } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import ReactApexChart from "react-apexcharts";
import type { BusinessesWithShareholders } from "@/data/businesses";

export default function ShareValueChart({
  businesses,
}: {
  businesses: BusinessesWithShareholders;
}) {
  const [mounted, setMounted] = useState(false);
  const { theme, systemTheme } = useTheme();
  const chartTheme = theme
    ? theme === "system"
      ? systemTheme
      : (theme as "light" | "dark")
    : "dark";
  // Prevent hydration warnings
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const series = generateShareValueSeries(businesses);

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
        theme: {
          mode: chartTheme,
          palette: "palette3",
        },
        title: { text: "Share Value Per Year" },
        xaxis: { type: "category", categories: generateYearsArray() },
        yaxis: {
          title: { text: "Share Value ($)" },
          labels: {
            formatter: (value: number): string => formatMoney(value),
          },
        },
      }}
      series={series}
      type="line"
      height={350}
    />
  );
}
