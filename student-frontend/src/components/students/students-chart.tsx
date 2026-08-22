"use client";

import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from "@/components/ui/chart";
import { Bar, BarChart, XAxis, YAxis, CartesianGrid } from "recharts";
import { Student } from "@/lib/api";

const chartConfig = {
  count: {
    label: "Students",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

export function StudentsChart({ students }: { students: Student[] }) {
  const data = useMemo(() => {
    const grouped: Record<string, number> = {};
    students.forEach((s) => {
      grouped[s.branch] = (grouped[s.branch] || 0) + 1;
    });
    return Object.entries(grouped)
      .map(([branch, count]) => ({ branch, count }))
      .sort((a, b) => b.count - a.count);
  }, [students]);

  return (
    <Card className="rounded-2xl shadow-sm border-none mb-6">
      <CardHeader>
        <CardTitle>Students by Branch</CardTitle>
        <p className="text-sm text-muted-foreground">
          {students.length} total students enrolled
        </p>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <div className="h-[220px] flex items-center justify-center text-muted-foreground text-sm">
            No data to display yet
          </div>
        ) : (
          <ChartContainer config={chartConfig} className="h-[220px] w-full">
            <BarChart data={data}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis
                dataKey="branch"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
              <YAxis
                allowDecimals={false}
                tickLine={false}
                axisLine={false}
                width={28}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar
                dataKey="count"
                fill="var(--color-count)"
                radius={[6, 6, 0, 0]}
                maxBarSize={48}
              />
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}