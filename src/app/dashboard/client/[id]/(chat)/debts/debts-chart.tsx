"use client";

import type { Debt } from "@/app/data/db";
import { generateDebtsSeries } from "@/lib/debts/utils";
import { formatMoney } from "@/lib/utils";
import ReactApexChart from "react-apexcharts";

export default function DebtsChart({ debts }: { debts: Debt[] }) {
  const series = generateDebtsSeries(debts);
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
