"use client";

import type { TooltipProps } from "recharts";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { formatMoney } from "@/lib/utils";

const data = [
  {
    year: "2024",
    "bank loan": 100000,
  },
  {
    year: "2025",
    "bank loan": 80000,
  },
  {
    year: "2026",
    "bank loan": 50000,
  },
  {
    year: "2027",
    "bank loan": 28000,
  },
  {
    year: "2028",
    "bank loan": 17000,
  },
  {
    year: "2029",
    "bank loan": 5000,
  },
];

const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    const {
      name,
      value,
      color,
      payload: { year },
    } = payload[0];

    return (
      <div className="space-y-2 divide-y rounded-xl border bg-background p-2 shadow-xl dark:divide-secondary-foreground dark:border-secondary-foreground">
        <p className="label flex items-center gap-2 text-sm font-medium tracking-wide">
          <div
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: `${color}` }}
          ></div>
          <span>{name}:</span>
          <span className="font-bold">{`${value && formatMoney(value)}`}</span>
        </p>
        <p className="pt-2 text-center text-xs font-medium">{year}</p>
      </div>
    );
  }
  return null;
};

export default function DebtsChart() {
  return (
    <div className="h-[500px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 10,
            bottom: 50,
            right: 10,
            left: 60,
          }}
        >
          <CartesianGrid strokeDasharray="3 2" vertical={false} />
          <XAxis
            className="text-xs font-semibold"
            dataKey="year"
            tick={{
              fill: "hsl(var(--muted-foreground))",
            }}
            tickLine={{
              stroke: "hsl(var(--muted-foreground))",
            }}
            label={{
              value: "Years",
              position: "insideBottom",
              fill: "hsl(var(--primary))",
              offset: -30,
            }}
            interval="preserveStartEnd"
            dx={-10}
            dy={12}
            angle={-35}
          />
          <YAxis
            className="text-xs font-semibold"
            dataKey={"bank loan"}
            tick={{ fill: "hsl(var(--muted-foreground))" }}
            tickLine={{
              stroke: "hsl(var(--muted-foreground))",
            }}
            tickFormatter={(debtValue) => formatMoney(debtValue)}
            label={{
              value: "Debt Value ($)",
              fill: "hsl(var(--primary))",
              angle: -90,
              position: "insideLeft",
              offset: -50,
            }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend verticalAlign="top" height={40} iconSize={18} />
          <Line
            type="monotone"
            dataKey="bank loan"
            stroke="#8884d8"
            strokeWidth={1.5}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
