"use client";

import { generateDiversificationSeries } from "@/lib/asset/utils";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import type { Tables } from "../../../../../../../types/supabase";

export default function DiversificationChart({
  assets,
}: {
  assets: Tables<"assets">[];
}) {
  const [mounted, setMounted] = useState(false);
  const { theme, systemTheme } = useTheme();
  const chartTheme = theme
    ? theme === "system"
      ? systemTheme
      : (theme as "light" | "dark")
    : "dark";
  const { series, labels } = generateDiversificationSeries(assets);
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
        theme: {
          mode: chartTheme,
          palette: "palette5",
        },
        title: { text: "Asset Diversification" },
        legend: { position: "bottom" },
      }}
      series={series}
      type="pie"
      height={350}
    />
  );
}
