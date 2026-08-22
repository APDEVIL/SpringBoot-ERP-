"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Student } from "@/lib/api";
import { Users, GraduationCap, TrendingUp, Award } from "lucide-react";

export function StatsCards({ students }: { students: Student[] }) {
  const total = students.length;
  const branches = new Set(students.map((s) => s.branch));
  const branchCount = branches.size;
  const topBranch =
    [...branches].sort(
      (a, b) =>
        students.filter((s) => s.branch === b).length -
        students.filter((s) => s.branch === a).length
    )[0] || "—";

  const stats = [
    {
      label: "Total Students",
      value: total,
      icon: Users,
      bg: "bg-blue-500/10",
      color: "text-blue-600",
    },
    {
      label: "Branches",
      value: branchCount,
      icon: GraduationCap,
      bg: "bg-emerald-500/10",
      color: "text-emerald-600",
    },
    {
      label: "Avg. per Branch",
      value: branchCount ? Math.round(total / branchCount) : 0,
      icon: TrendingUp,
      bg: "bg-amber-500/10",
      color: "text-amber-600",
    },
    {
      label: "Top Branch",
      value: topBranch,
      icon: Award,
      bg: "bg-pink-500/10",
      color: "text-pink-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat) => (
        <Card key={stat.label} className="rounded-2xl shadow-sm border-none bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.label}
            </CardTitle>
            <div className={`h-9 w-9 rounded-xl ${stat.bg} flex items-center justify-center`}>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold truncate">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}