"use client";
import {
  generateEbitdaSeries,
  generateYearsArray,
} from "@/lib/businesses/utils";
import { formatMoney } from "@/lib/utils";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import type { BusinessesWithShareholdersAndKeyPeople } from "@/data/businesses";

export default function EBITDAContributionChart({
  businesses,
}: {
  businesses: BusinessesWithShareholdersAndKeyPeople;
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

  const series = generateEbitdaSeries(businesses);

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
        xaxis: { type: "category", categories: generateYearsArray() },
        yaxis: {
          title: { text: "EBITDA Contribution ($)" },
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
