"use client";

import type { Asset } from "@/app/data/db";
import { generateNetWorthSeries } from "@/lib/asset/utils";
import { formatMoney } from "@/lib/utils";
import ReactApexChart from "react-apexcharts";

export default function NetWorthChart({ assets }: { assets: Asset[] }) {
  const { series, xAxisOptions } = generateNetWorthSeries(assets);
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
        } as ApexChart,
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
