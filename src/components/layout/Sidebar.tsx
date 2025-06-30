"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Home,
  Search,
  BarChart3,
  Trophy,
  Settings,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";

const navigation = [
  {
    name: "Tổng quan",
    href: "/",
    icon: Home,
    description: "Dashboard chính",
  },
  {
    name: "Tra cứu điểm",
    href: "/search",
    icon: Search,
    description: "Tìm kiếm kết quả thi",
  },
  {
    name: "Thống kê",
    href: "/statistics",
    icon: BarChart3,
    description: "Biểu đồ và phân tích",
  },
  {
    name: "Bảng xếp hạng",
    href: "/top10",
    icon: Trophy,
    description: "Top 10 khối A",
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleMobileSidebar = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  return (
    <>
      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={toggleMobileSidebar}
        />
      )}

      {/* Mobile menu button */}
      <button
        onClick={toggleMobileSidebar}
        className="fixed top-4 left-4 z-50 lg:hidden bg-white p-2 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
      >
        {isMobileOpen ? (
          <X className="h-6 w-6 text-gray-600" />
        ) : (
          <Menu className="h-6 w-6 text-gray-600" />
        )}
      </button>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 h-full bg-white shadow-xl z-50 transition-all duration-300 ease-in-out lg:relative lg:z-auto",
          isCollapsed ? "w-20" : "w-72",
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <div
              className={cn(
                "flex items-center space-x-3",
                isCollapsed && "justify-center"
              )}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              {!isCollapsed && (
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Go Score</h1>
                  <p className="text-sm text-gray-500">Hệ thống tra cứu điểm</p>
                </div>
              )}
            </div>
            <button
              onClick={toggleSidebar}
              className="hidden lg:flex p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <ChevronRight
                className={cn(
                  "h-5 w-5 text-gray-400 transition-transform duration-300",
                  isCollapsed ? "rotate-0" : "rotate-180"
                )}
              />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6">
            <div className="space-y-2">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileOpen(false)}
                    className={cn(
                      "flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group relative",
                      isActive
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    )}
                  >
                    <Icon className="h-5 w-5 flex-shrink-0" />
                    {!isCollapsed && (
                      <>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium">{item.name}</div>
                          <div
                            className={cn(
                              "text-xs opacity-80 truncate",
                              isActive ? "text-blue-100" : "text-gray-400"
                            )}
                          >
                            {item.description}
                          </div>
                        </div>
                        {isActive && (
                          <div className="w-2 h-2 bg-white rounded-full opacity-80" />
                        )}
                      </>
                    )}

                    {/* Tooltip for collapsed state */}
                    {isCollapsed && (
                      <div className="absolute left-full ml-4 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50">
                        {item.name}
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900 rotate-45" />
                      </div>
                    )}
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-100">
            <div
              className={cn(
                "flex items-center space-x-3 px-4 py-3 rounded-xl bg-gray-50",
                isCollapsed && "justify-center"
              )}
            >
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <Settings className="h-4 w-4 text-gray-600" />
              </div>
              {!isCollapsed && (
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-900">
                    Hệ thống
                  </div>
                  <div className="text-xs text-gray-500">
                    Phiên bản {process.env.NEXT_PUBLIC_APP_VERSION}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
