"use client";
import { generateGoalsSeries } from "@/lib/goals/utils";
import { formatMoney } from "@/lib/utils";
import ReactApexChart from "react-apexcharts";

export default function GoalsChart({
  totalFutureValueLiquidAssets,
  liquidityPreserved,
  liquidityAllocatedToGoals,
  totalSumGoals,
  surplusShortfall,
}: {
  totalFutureValueLiquidAssets: number;
  liquidityPreserved: number;
  liquidityAllocatedToGoals: number;
  totalSumGoals: number;
  surplusShortfall: number;
}) {
  const categories = [
    "Future Liquidity",
    "Preserved Liquidity",
    "Allocated to Goals",
    "Total Goals",
    "Surplus / Shortfall",
  ];
  return (
    <ReactApexChart
      options={{
        chart: {
          type: "bar",
          height: 350,
          animations: {
            enabled: false,
          },
          toolbar: {
            show: false,
          },
        },
        xaxis: {
          categories,
        },
        yaxis: {
          title: { text: "Value ($)" },
          labels: {
            formatter: (value: number) => formatMoney(value),
          },
        },
        tooltip: {
          y: {
            formatter: (value: number) => formatMoney(value),
            title: {
              formatter: () => "",
            },
          },
        },

        dataLabels: { enabled: false },
        plotOptions: { bar: { horizontal: false } },
      }}
      series={[
        {
          data: generateGoalsSeries(
            [
              totalFutureValueLiquidAssets,
              liquidityPreserved,
              liquidityAllocatedToGoals,
              -totalSumGoals,
              surplusShortfall,
            ],
            categories,
            "#00E396",
            "#FF4560"
          ),
        },
      ]}
      type="line"
      height={350}
    />
  );
}
