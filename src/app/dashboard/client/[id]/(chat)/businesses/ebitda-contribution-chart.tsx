"use client";
import type { Business } from "@/app/data/db";
import {
  generateEbitdaSeries,
  generateYearsArray,
} from "@/lib/businesses/utils";
import { formatMoney } from "@/lib/utils";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

export default function EBITDAContributionChart({
  businesses,
}: {
  businesses: Business[];
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
        title: { text: "EBITDA Contribution Per Year" },
        xaxis: { type: "category", categories: generateYearsArray() },
        yaxis: {
          title: { text: "EBITDA Contribution ($)" },
          labels: {
            formatter: (value: number): string => formatMoney(value),
          },
        },
      }}
      series={generateEbitdaSeries(businesses)}
      type="line"
      height={350}
    />
  );
}
