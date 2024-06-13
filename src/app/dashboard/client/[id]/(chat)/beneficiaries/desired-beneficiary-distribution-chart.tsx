"use client";

import type { Beneficiary } from "@/app/data/db";
import { generateDesiredDistributionSeriesAndLabels } from "@/lib/beneficiaries/utils";
import ReactApexChart from "react-apexcharts";

export default function DesiredBeneficiaryDistributionChart({
  beneficiaries,
}: {
  beneficiaries: Beneficiary[];
}) {
  const { series, labels } =
    generateDesiredDistributionSeriesAndLabels(beneficiaries);
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
        title: { text: "Desired Beneficiary Distribution" },
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
