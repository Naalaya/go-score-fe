import { Github, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:justify-between items-center space-y-4 md:space-y-0">
          {/* Left side */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-semibold text-gray-900">
              Go Score Service
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Tra cứu điểm thi THPT Quốc gia 2024
            </p>
            <p className="text-xs text-gray-500 mt-2">
              Dữ liệu chính thức từ Bộ Giáo dục và Đào tạo
            </p>
          </div>

          {/* Right side */}
          <div className="flex flex-col items-center md:items-end">
            <div className="flex items-center space-x-4 mb-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
            <p className="text-xs text-gray-500 flex items-center">
              Made with <Heart className="h-3 w-3 mx-1 text-red-500" /> for
              students
            </p>
            <p className="text-xs text-gray-400 mt-1">
              © 2024 Go Score Service. All rights reserved.
            </p>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            <strong>Lưu ý:</strong> Thông tin điểm thi chỉ mang tính chất tham
            khảo. Kết quả chính thức vui lòng tra cứu tại website của Bộ Giáo
            dục và Đào tạo.
          </p>
        </div>
      </div>
    </footer>
  );
}
