"use client";
import { generateGoalsSeries } from "@/lib/goals/utils";
import { formatMoney } from "@/lib/utils";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
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
        theme: {
          mode: chartTheme,
          palette: "palette3",
        },
        title: { text: "Goal Allocation and Liquidity Distribution" },
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
      type="bar"
      height={350}
    />
  );
}
