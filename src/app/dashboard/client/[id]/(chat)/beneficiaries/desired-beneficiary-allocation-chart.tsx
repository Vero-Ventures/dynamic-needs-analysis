"use client";

import type { TooltipProps } from "recharts";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import type { Beneficiary } from "@/app/data/db";

const randomHexColorCode = () => {
  const n = (Math.random() * 0xfffff * 1000000).toString(16);
  return "#" + n.slice(0, 6);
};

const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    const { name, value } = payload[0];

    return (
      <div className="custom-tooltip rounded-xl border bg-background p-2 shadow-xl">
        <p className="label font-medium">{`${name}: ${value}%`}</p>
      </div>
    );
  }
  return null;
};

export default function DesiredBeneficiaryAllocationChart({
  beneficiariesData,
}: {
  beneficiariesData: Beneficiary[];
}) {
  return (
    <div className="mt-20 space-y-3">
      <h1 className="text-center text-xl font-bold tracking-wide">
        Desired Beneficiary Allocation
      </h1>
      <div className="h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart width={400} height={400}>
            <Pie
              data={beneficiariesData}
              cx="50%"
              cy="50%"
              labelLine={false}
              dataKey="allocation"
            >
              {beneficiariesData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={randomHexColorCode()} />
              ))}
            </Pie>

            <Tooltip content={<CustomTooltip />} />
            <Legend iconType="circle" iconSize={10} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
