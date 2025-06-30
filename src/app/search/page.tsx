"use client";

import { useState } from "react";
import { useScoreSearch } from "@/hooks/useScoreSearch";
import ScoreSearchForm from "@/components/score-search/ScoreSearchForm";
import ScoreResult from "@/components/score-search/ScoreResult";
import { PageLoading } from "@/components/common/LoadingSpinner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Search,
  BookOpen,
  Award,
  BarChart3,
  TrendingUp,
  Users,
  Calculator,
} from "lucide-react";

export default function SearchPage() {
  const { searchScore, loading, error, data } = useScoreSearch();
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (sbd: string) => {
    try {
      await searchScore({ sbd });
      setHasSearched(true);
    } catch {
      setHasSearched(true); // Still show searched state even if error
    }
  };

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <div className="page-header">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Tra cứu điểm thi THPT 2024
          </h1>
          <p className="text-gray-600 mt-2">
            Nhập số báo danh để xem kết quả thi chi tiết
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="page-content">
        <div className="max-w-6xl mx-auto">
          {/* Search Form - Always Visible */}
          <div
            className={`transition-all duration-500 ${
              hasSearched ? "mb-8" : "mb-12"
            }`}
          >
            <div
              className={
                hasSearched ? "max-w-2xl mx-auto" : "max-w-3xl mx-auto"
              }
            >
              <ScoreSearchForm
                onSearch={handleSearch}
                loading={loading}
                error={error}
                compact={hasSearched}
              />
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="animate-fade-in mb-8">
              <PageLoading text="Đang tìm kiếm kết quả..." />
            </div>
          )}

          {/* Search Results */}
          {hasSearched && !loading && data && (
            <div className="animate-slide-up mb-8">
              <ScoreResult score={data.data} />
            </div>
          )}

          {/* Error State */}
          {hasSearched && !loading && error && (
            <div className="animate-fade-in mb-8">
              <Card className="card-modern border-red-200 bg-red-50">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="h-8 w-8 text-red-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-red-900 mb-2">
                    Không tìm thấy kết quả
                  </h3>
                  <p className="text-red-700 mb-4">{error}</p>
                  <p className="text-sm text-red-600">
                    Vui lòng kiểm tra lại số báo danh và thử lại
                  </p>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Help Section - Only show when no search has been made */}
          {!hasSearched && !loading && (
            <div className="space-y-8">
              {/* Quick Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="card-gradient text-center">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <Users className="h-6 w-6 text-blue-600" />
                    </div>
                    <p className="text-2xl font-bold text-gray-900">
                      1,061,605
                    </p>
                    <p className="text-sm text-gray-600">Thí sinh</p>
                  </CardContent>
                </Card>
                <Card className="card-gradient text-center">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <BookOpen className="h-6 w-6 text-green-600" />
                    </div>
                    <p className="text-2xl font-bold text-gray-900">9</p>
                    <p className="text-sm text-gray-600">Môn thi</p>
                  </CardContent>
                </Card>
                <Card className="card-gradient text-center">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <TrendingUp className="h-6 w-6 text-purple-600" />
                    </div>
                    <p className="text-2xl font-bold text-gray-900">85.2%</p>
                    <p className="text-sm text-gray-600">Tỷ lệ đậu</p>
                  </CardContent>
                </Card>
                <Card className="card-gradient text-center">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <Calculator className="h-6 w-6 text-yellow-600" />
                    </div>
                    <p className="text-2xl font-bold text-gray-900">6.45</p>
                    <p className="text-sm text-gray-600">Điểm TB</p>
                  </CardContent>
                </Card>
              </div>

              {/* Features & Tips */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Tips */}
                <Card className="card-modern">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Search className="h-5 w-5 text-blue-600" />
                      Hướng dẫn tra cứu
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                          1
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 text-sm">
                            Chuẩn bị số báo danh
                          </p>
                          <p className="text-gray-600 text-xs">
                            Đảm bảo có số báo danh 8-10 chữ số chính xác
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                          2
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 text-sm">
                            Nhập và tra cứu
                          </p>
                          <p className="text-gray-600 text-xs">
                            Nhập chính xác số báo danh và nhấn tra cứu
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                          3
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 text-sm">
                            Xem kết quả chi tiết
                          </p>
                          <p className="text-gray-600 text-xs">
                            Kết quả sẽ hiển thị ngay bên dưới form tra cứu
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Features */}
                <Card className="card-modern">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Award className="h-5 w-5 text-green-600" />
                      Tính năng nổi bật
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <BookOpen className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 text-sm">
                            Điểm chi tiết từng môn
                          </p>
                          <p className="text-gray-600 text-xs">
                            Xem điểm và xếp loại từng môn học
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                          <BarChart3 className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 text-sm">
                            Thống kê và phân tích
                          </p>
                          <p className="text-gray-600 text-xs">
                            Xem thống kê tổng quan và phân tích điểm số
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                          <Award className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 text-sm">
                            Bảng xếp hạng khối A
                          </p>
                          <p className="text-gray-600 text-xs">
                            So sánh với top 10 học sinh xuất sắc
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
