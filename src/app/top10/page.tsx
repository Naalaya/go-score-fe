"use client";

import { useTop10 } from "@/hooks/useTop10";
import Top10Table from "@/components/top10/Top10Table";
import { PageLoading } from "@/components/common/LoadingSpinner";
import { PageError } from "@/components/common/ErrorDisplay";
import { Trophy } from "lucide-react";

export default function Top10Page() {
  const { top10, loading, error, mutate } = useTop10();

  if (loading) {
    return <PageLoading text="Đang tải danh sách top 10..." />;
  }

  if (error) {
    return (
      <PageError
        title="Không thể tải dữ liệu"
        message={error}
        onRetry={() => mutate()}
      />
    );
  }

  if (!top10) {
    return (
      <PageError
        title="Không có dữ liệu"
        message="Không tìm thấy dữ liệu top 10 học sinh khối A"
        onRetry={() => mutate()}
      />
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Trophy className="h-12 w-12 text-yellow-500" />
          <h1 className="text-4xl font-bold text-gray-900">Top 10 Khối A</h1>
        </div>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Danh sách 10 học sinh có tổng điểm cao nhất khối A trong kỳ thi THPT
          Quốc gia 2024
        </p>
      </div>

      <Top10Table data={top10} />

      <div className="mt-8 text-center text-sm text-gray-500">
        <p>
          <strong>Lưu ý:</strong> Xếp hạng được tính dựa trên tổng điểm 3 môn:
          Toán, Vật lý, Hóa học.
        </p>
      </div>
    </div>
  );
}
