import Link from "next/link";
import {
  Search,
  BarChart3,
  Trophy,
  Users,
  BookOpen,
  TrendingUp,
  ArrowRight,
  Star,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const quickActions = [
  {
    title: "Tra cứu điểm thi",
    description: "Nhập số báo danh để xem kết quả ngay",
    icon: Search,
    href: "/search",
    color: "from-blue-500 to-blue-600",
    iconBg: "bg-blue-500",
  },
  {
    title: "Xem thống kê",
    description: "Phân tích điểm số chi tiết",
    icon: BarChart3,
    href: "/statistics",
    color: "from-green-500 to-green-600",
    iconBg: "bg-green-500",
  },
  {
    title: "Bảng xếp hạng",
    description: "Top học sinh xuất sắc",
    icon: Trophy,
    href: "/top10",
    color: "from-yellow-500 to-yellow-600",
    iconBg: "bg-yellow-500",
  },
];

const systemStats = [
  {
    title: "Tổng thí sinh",
    value: "1,061,605",
    change: "+2.5%",
    icon: Users,
    trend: "up",
  },
  {
    title: "Môn thi",
    value: "9",
    change: "Đầy đủ",
    icon: BookOpen,
    trend: "stable",
  },
  {
    title: "Tỷ lệ đậu",
    value: "85.2%",
    change: "+1.2%",
    icon: TrendingUp,
    trend: "up",
  },
  {
    title: "Điểm TB",
    value: "6.45",
    change: "+0.15",
    icon: Star,
    trend: "up",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <div className="page-header">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Tổng quan</h1>
            <p className="text-gray-600 mt-1">
              Chào mừng bạn đến với hệ thống tra cứu điểm thi THPT 2024
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-sm text-gray-500">
              Cập nhật: {new Date().toLocaleDateString("vi-VN")}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="page-content space-y-8">
        {/* Quick Actions */}
        <section className="animate-fade-in">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Thao tác nhanh
          </h2>
          <div className="grid-responsive">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Card
                  key={action.title}
                  className="card-modern group cursor-pointer animate-scale-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardHeader className="pb-4">
                    <div
                      className={`w-12 h-12 ${action.iconBg} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}
                    >
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
                      {action.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                      {action.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link href={action.href}>
                      <Button className="w-full btn-secondary group-hover:bg-blue-50 group-hover:border-blue-300">
                        Truy cập
                        <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* System Statistics */}
        <section className="animate-slide-up">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Thống kê hệ thống
          </h2>
          <div className="grid-responsive-4">
            {systemStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card
                  key={stat.title}
                  className="card-gradient"
                  style={{ animationDelay: `${index * 50 + 200}ms` }}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">
                          {stat.title}
                        </p>
                        <p className="text-2xl font-bold text-gray-900 mt-1">
                          {stat.value}
                        </p>
                        <p
                          className={`text-xs mt-1 ${
                            stat.trend === "up"
                              ? "text-green-600"
                              : stat.trend === "down"
                              ? "text-red-600"
                              : "text-gray-500"
                          }`}
                        >
                          {stat.change}
                        </p>
                      </div>
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                        <Icon className="h-6 w-6 text-blue-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Quick Start Guide */}
        <section
          className="animate-slide-up max-w-2xl mx-auto"
          style={{ animationDelay: "300ms" }}
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center">
            Hướng dẫn sử dụng
          </h2>
          <Card className="card-modern">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                    1
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">
                      Chuẩn bị số báo danh
                    </p>
                    <p className="text-gray-600 text-xs mt-1">
                      Đảm bảo có số báo danh 8-10 chữ số chính xác
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                    2
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">
                      Tra cứu điểm
                    </p>
                    <p className="text-gray-600 text-xs mt-1">
                      Nhập số báo danh vào form tra cứu
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                    3
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">
                      Xem kết quả
                    </p>
                    <p className="text-gray-600 text-xs mt-1">
                      Kiểm tra điểm chi tiết và xếp loại từng môn
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-100">
                <Link href="/search">
                  <Button className="w-full btn-primary">
                    Bắt đầu tra cứu
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
