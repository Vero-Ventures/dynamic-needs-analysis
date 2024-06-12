"use client";
import type { Business } from "@/app/data/db";
import {
  generateEbitdaSeries,
  generateYearsArray,
} from "@/lib/businesses/utils";
import { formatMoney } from "@/lib/utils";
import ReactApexChart from "react-apexcharts";

export default function EBITDAContributionChart({
  businesses,
}: {
  businesses: Business[];
}) {
  return (
    <ReactApexChart
      options={{
        chart: {
          type: "line",
          height: 350,
          animations: {
            enabled: false,
          },
          toolbar: {
            show: false,
          },
        },
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
