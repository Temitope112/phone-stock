"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type RevenueData = {
  month: string;
  revenue: number;
};

type AdminRevenueChartProps = {
  data: RevenueData[];
};

const formatCurrency = (value: number) => {
  if (value >= 1_000_000) {
    return `₦${(value / 1_000_000).toFixed(1)}M`;
  }

  if (value >= 1_000) {
    return `₦${(value / 1_000).toFixed(0)}K`;
  }

  return `₦${value}`;
};

export default function AdminRevenueChart({
  data,
}: AdminRevenueChartProps) {
  return (
    <div className="h-[320px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 20,
            right: 15,
            left: 5,
            bottom: 5,
          }}
        >
          <CartesianGrid
            strokeDasharray="4 4"
            stroke="rgba(255,255,255,0.08)"
            vertical={false}
          />

          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{
              fill: "rgba(255,255,255,0.45)",
              fontSize: 12,
            }}
          />

          <YAxis
            axisLine={false}
            tickLine={false}
            tickFormatter={formatCurrency}
            tick={{
              fill: "rgba(255,255,255,0.45)",
              fontSize: 12,
            }}
          />

          <Tooltip
            cursor={{
              stroke: "rgba(34,211,238,0.25)",
              strokeWidth: 1,
            }}
            formatter={(value) => [
              formatCurrency(Number(value)),
              "Revenue",
            ]}
            contentStyle={{
              background: "#071020",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "14px",
            }}
            labelStyle={{
              color: "rgba(255,255,255,0.65)",
            }}
          />

          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#22d3ee"
            strokeWidth={4}
            dot={{
              fill: "#22d3ee",
              strokeWidth: 0,
              r: 4,
            }}
            activeDot={{
              r: 7,
              fill: "#ffffff",
              stroke: "#22d3ee",
              strokeWidth: 3,
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}