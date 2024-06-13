"use client";
import type { Business } from "@/app/data/db";
import {
  generateShareValueSeries,
  generateYearsArray,
} from "@/lib/businesses/utils";
import { formatMoney } from "@/lib/utils";
import ReactApexChart from "react-apexcharts";

export default function ShareValueChart({
  businesses,
}: {
  businesses: Business[];
}) {
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
        title: { text: "Share Value Per Year" },
        xaxis: { type: "category", categories: generateYearsArray() },
        yaxis: {
          title: { text: "Share Value ($)" },
          labels: {
            formatter: (value: number): string => formatMoney(value),
          },
        },
      }}
      series={generateShareValueSeries(businesses)}
      type="line"
      height={350}
    />
  );
}
