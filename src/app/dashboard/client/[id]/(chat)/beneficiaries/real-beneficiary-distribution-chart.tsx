"use client";

import type { Asset } from "@/app/data/db";
import { generateRealDistributionSeriesAndLabels } from "@/lib/beneficiaries/utils";
import ReactApexChart from "react-apexcharts";

export default function RealBeneficiaryDistributionChart({
  assets,
}: {
  assets: Asset[];
}) {
  const { series, labels } = generateRealDistributionSeriesAndLabels(assets);
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
        dataLabels: {
          enabled: true,
        },
        title: { text: "Real Beneficiary Distribution" },
        legend: { position: "bottom" },
        labels,
        xaxis: { type: "category", categories: [] },
        yaxis: { title: { text: "" } },
        plotOptions: { bar: { horizontal: true } },
      }}
      series={series}
      type="pie"
      height={350}
    />
  );
}
