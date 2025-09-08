"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface IChartProps {
  enrollments: number;
  users: number;
  courses: number;
}

export default function DashboardChart({
  enrollments,
  users,
  courses,
}: IChartProps) {
  const data = [
    { name: "Enrollments", value: enrollments },
    { name: "Users", value: users },
    { name: "Courses", value: courses },
  ];

  // Detect dark/light mode via Tailwind dark class
  const isDark = document.documentElement.classList.contains("dark");
  const barFill = isDark ? "#A78BFA" : "#6366F1"; // pastel violet for dark, indigo for light

  return (
    <Card className="bg-white dark:bg-violet-900 transition-colors mx-4 my-1.5">
      <CardHeader>
        <CardTitle className="text-gray-900  dark:text-gray-100 font-bold text-3xl">
          Edu Care Stats
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer>
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
            >
              <XAxis dataKey="name" stroke="currentColor" />
              <YAxis stroke="currentColor" />
              <Tooltip
                contentStyle={{
                  backgroundColor: isDark ? "#5B21B6" : "#f3f4f6",
                  color: isDark ? "#F3F4F6" : "#111827",
                  border: "none",
                  borderRadius: "0.5rem",
                  padding: "0.5rem",
                }}
                cursor={{ fill: "rgba(0,0,0,0.05)" }}
              />
              <Legend wrapperStyle={{ color: "currentColor" }} />
              <Bar dataKey="value" fill={barFill} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
