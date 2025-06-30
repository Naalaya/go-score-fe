"use client";

import { useStatistics } from "@/hooks/useStatistics";
import StatisticsChart from "@/components/statistics/StatisticsChart";
import { PageLoading } from "@/components/common/LoadingSpinner";
import { PageError } from "@/components/common/ErrorDisplay";
import { BarChart3 } from "lucide-react";

export default function StatisticsPage() {
  const { statistics, loading, error, mutate } = useStatistics();

  if (loading) {
    return <PageLoading text="Đang tải dữ liệu thống kê..." />;
  }

  if (error) {
    return (
      <PageError
        title="Không thể tải dữ liệu thống kê"
        message={error}
        onRetry={() => mutate()}
      />
    );
  }

  if (!statistics) {
    return (
      <PageError
        title="Không có dữ liệu"
        message="Không tìm thấy dữ liệu thống kê điểm thi"
        onRetry={() => mutate()}
      />
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <BarChart3 className="h-12 w-12 text-green-500" />
          <h1 className="text-4xl font-bold text-gray-900">
            Thống kê điểm thi
          </h1>
        </div>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Phân tích chi tiết điểm số theo 4 mức độ và môn học trong kỳ thi THPT
          Quốc gia 2024
        </p>
      </div>

      {/* Statistics Chart */}
      <StatisticsChart data={statistics} />

      {/* Additional Info */}
      <div className="mt-8 text-center text-sm text-gray-500">
        <div className="max-w-4xl mx-auto space-y-2">
          <p>
            <strong>Phân loại điểm:</strong> Giỏi (≥8.0) • Khá (6.0-7.9) • Trung
            bình (4.0-5.9) • Yếu (&lt;4.0)
          </p>
        </div>
      </div>
    </div>
  );
}
