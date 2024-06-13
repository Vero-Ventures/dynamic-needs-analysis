"use client";

import type { Asset } from "@/app/data/db";
import { generateDiversificationSeries } from "@/lib/asset/utils";
import ReactApexChart from "react-apexcharts";

const CUSTOM_COLORS: string[] = [
  "#1f77b4",
  "#ff7f0e",
  "#2ca02c",
  "#d62728",
  "#9467bd",
  "#8c564b",
  "#e377c2",
  "#7f7f7f",
  "#bcbd22",
  "#17becf",
];

export default function DiversificationChart({ assets }: { assets: Asset[] }) {
  const { series, labels } = generateDiversificationSeries(assets);
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
        responsive: [
          {
            breakpoint: 400,
            options: {
              chart: {
                width: 200,
                animations: {
                  enabled: false,
                },
                toolbar: {
                  show: false,
                },
              },
            },
          },
        ],
        labels,
        title: { text: "Asset Diversification" },
        legend: { position: "bottom" },
        colors: CUSTOM_COLORS,
      }}
      series={series}
      type="pie"
      height={350}
    />
  );
}
