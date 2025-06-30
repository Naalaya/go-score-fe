import type { Metadata } from "next";
import localFont from "next/font/local";
import Sidebar from "@/components/layout/Sidebar";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Go Score Service - Hệ thống tra cứu điểm thi THPT 2024",
  description:
    "Hệ thống tra cứu điểm thi THPT Quốc gia 2024, thống kê điểm theo môn học và xem top 10 học sinh xuất sắc",
  keywords: "tra cứu điểm thi, THPT 2024, điểm thi đại học, kết quả thi THPT",
  authors: [{ name: "Go Score Service" }],
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}
      >
        <div className="flex h-screen overflow-hidden">
          <Sidebar />
          <main className="flex-1 overflow-y-auto bg-gray-50">{children}</main>
        </div>
      </body>
    </html>
  );
}
