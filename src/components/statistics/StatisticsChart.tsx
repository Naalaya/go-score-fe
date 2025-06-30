"use client";

import { useMemo } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { StatisticsData } from "@/types";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface StatisticsChartProps {
  data: StatisticsData;
}

const gradeColors = {
  excellent: "#10b981", // green-500
  good: "#3b82f6", // blue-500
  average: "#f59e0b", // amber-500
  weak: "#ef4444", // red-500
};

export default function StatisticsChart({ data }: StatisticsChartProps) {
  const { statistics, summary } = data;

  // Prepare data for Bar Chart (by subject)
  const barChartData = useMemo(() => {
    const labels = statistics.map((stat) => stat.subject_name);

    return {
      labels,
      datasets: [
        {
          label: "Giỏi (≥8.0)",
          data: statistics.map((stat) => stat.excellent),
          backgroundColor: gradeColors.excellent,
          borderColor: gradeColors.excellent,
          borderWidth: 1,
        },
        {
          label: "Khá (6.0-7.9)",
          data: statistics.map((stat) => stat.good),
          backgroundColor: gradeColors.good,
          borderColor: gradeColors.good,
          borderWidth: 1,
        },
        {
          label: "Trung bình (4.0-5.9)",
          data: statistics.map((stat) => stat.average),
          backgroundColor: gradeColors.average,
          borderColor: gradeColors.average,
          borderWidth: 1,
        },
        {
          label: "Yếu (<4.0)",
          data: statistics.map((stat) => stat.weak),
          backgroundColor: gradeColors.weak,
          borderColor: gradeColors.weak,
          borderWidth: 1,
        },
      ],
    };
  }, [statistics]);

  // Prepare data for Doughnut Chart (overall distribution)
  const doughnutChartData = useMemo(() => {
    const totals = statistics.reduce(
      (acc, stat) => ({
        excellent: acc.excellent + stat.excellent,
        good: acc.good + stat.good,
        average: acc.average + stat.average,
        weak: acc.weak + stat.weak,
      }),
      { excellent: 0, good: 0, average: 0, weak: 0 }
    );

    return {
      labels: [
        "Giỏi (≥8.0)",
        "Khá (6.0-7.9)",
        "Trung bình (4.0-5.9)",
        "Yếu (<4.0)",
      ],
      datasets: [
        {
          data: [totals.excellent, totals.good, totals.average, totals.weak],
          backgroundColor: [
            gradeColors.excellent,
            gradeColors.good,
            gradeColors.average,
            gradeColors.weak,
          ],
          borderColor: [
            gradeColors.excellent,
            gradeColors.good,
            gradeColors.average,
            gradeColors.weak,
          ],
          borderWidth: 2,
        },
      ],
    };
  }, [statistics]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: false,
      },
      tooltip: {
        callbacks: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          label: function (context: any) {
            const label = context.dataset.label || "";
            const value = context.parsed.y || context.parsed;
            const total = context.dataset.data.reduce(
              (a: number, b: number) => a + b,
              0
            );
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: ${value.toLocaleString()} (${percentage}%)`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Môn học",
        },
      },
      y: {
        title: {
          display: true,
          text: "Số lượng thí sinh",
        },
        beginAtZero: true,
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
      tooltip: {
        callbacks: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          label: function (context: any) {
            const label = context.label || "";
            const value = context.parsed;
            const total = context.dataset.data.reduce(
              (a: number, b: number) => a + b,
              0
            );
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: ${value.toLocaleString()} (${percentage}%)`;
          },
        },
      },
    },
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Tổng số thí sinh</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-blue-600">
              {summary.total_students.toLocaleString()}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Số môn thi</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600">
              {summary.total_subjects}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Cập nhật lần cuối</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              {new Date(summary.generated_at).toLocaleString("vi-VN")}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <Tabs defaultValue="bar" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="bar">Biểu đồ cột</TabsTrigger>
          <TabsTrigger value="doughnut">Biểu đồ tròn</TabsTrigger>
        </TabsList>

        <TabsContent value="bar" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Thống kê điểm theo môn học</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-96">
                <Bar data={barChartData} options={chartOptions} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="doughnut" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Phân bố tổng thể theo mức độ</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-96 flex items-center justify-center">
                <div className="w-80 h-80">
                  <Doughnut
                    data={doughnutChartData}
                    options={doughnutOptions}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Detailed Statistics Table */}
      <Card>
        <CardHeader>
          <CardTitle>Bảng thống kê chi tiết</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-medium">Môn học</th>
                  <th className="text-center p-3 font-medium text-green-600">
                    Giỏi
                  </th>
                  <th className="text-center p-3 font-medium text-blue-600">
                    Khá
                  </th>
                  <th className="text-center p-3 font-medium text-amber-600">
                    TB
                  </th>
                  <th className="text-center p-3 font-medium text-red-600">
                    Yếu
                  </th>
                  <th className="text-center p-3 font-medium">Tổng</th>
                  <th className="text-center p-3 font-medium">TB</th>
                </tr>
              </thead>
              <tbody>
                {statistics.map((stat) => (
                  <tr
                    key={stat.subject_code}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="p-3 font-medium">{stat.subject_name}</td>
                    <td className="text-center p-3 text-green-600">
                      {stat.excellent.toLocaleString()}
                      {stat.percentages && (
                        <div className="text-xs text-gray-500">
                          ({stat.percentages.excellent}%)
                        </div>
                      )}
                    </td>
                    <td className="text-center p-3 text-blue-600">
                      {stat.good.toLocaleString()}
                      {stat.percentages && (
                        <div className="text-xs text-gray-500">
                          ({stat.percentages.good}%)
                        </div>
                      )}
                    </td>
                    <td className="text-center p-3 text-amber-600">
                      {stat.average.toLocaleString()}
                      {stat.percentages && (
                        <div className="text-xs text-gray-500">
                          ({stat.percentages.average}%)
                        </div>
                      )}
                    </td>
                    <td className="text-center p-3 text-red-600">
                      {stat.weak.toLocaleString()}
                      {stat.percentages && (
                        <div className="text-xs text-gray-500">
                          ({stat.percentages.weak}%)
                        </div>
                      )}
                    </td>
                    <td className="text-center p-3 font-semibold">
                      {stat.total.toLocaleString()}
                    </td>
                    <td className="text-center p-3 font-semibold">
                      {stat.average_score.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
