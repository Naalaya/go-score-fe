import { Trophy, Medal, Award } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatScore, parseScore } from "@/lib/utils";
import type { Top10Data } from "@/types";

interface Top10TableProps {
  data: Top10Data;
}

const getRankIcon = (rank: number) => {
  switch (rank) {
    case 1:
      return <Trophy className="h-5 w-5 text-yellow-500" />;
    case 2:
      return <Medal className="h-5 w-5 text-gray-400" />;
    case 3:
      return <Award className="h-5 w-5 text-amber-600" />;
    default:
      return <span className="font-bold text-gray-600">#{rank}</span>;
  }
};

const getRankBadgeColor = (rank: number) => {
  switch (rank) {
    case 1:
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case 2:
      return "bg-gray-100 text-gray-800 border-gray-200";
    case 3:
      return "bg-amber-100 text-amber-800 border-amber-200";
    default:
      return "bg-blue-100 text-blue-800 border-blue-200";
  }
};

export default function Top10Table({ data }: Top10TableProps) {
  const { top_students, group_name, subjects } = data;

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Header Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-center justify-center">
            <Trophy className="h-8 w-8 text-yellow-500" />
            <div>
              <h2 className="text-2xl font-bold">{group_name}</h2>
              <p className="text-sm text-gray-600 font-normal">
                Top 10 học sinh có điểm cao nhất
              </p>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-2">
            <p className="text-gray-600">
              <strong>Các môn thi:</strong> {subjects.join(" • ")}
            </p>
            <p className="text-sm text-gray-500">
              Xếp hạng dựa trên tổng điểm 3 môn: Toán, Vật lý, Hóa học
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Top 3 Highlight */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {top_students.slice(0, 3).map((student) => (
          <Card
            key={student.sbd}
            className={`text-center ${
              student.rank === 1
                ? "ring-2 ring-yellow-400 bg-yellow-50"
                : student.rank === 2
                ? "ring-2 ring-gray-400 bg-gray-50"
                : "ring-2 ring-amber-400 bg-amber-50"
            }`}
          >
            <CardHeader className="pb-2">
              <div className="flex justify-center mb-2">
                {getRankIcon(student.rank)}
              </div>
              <CardTitle className="text-lg">Hạng {student.rank}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="font-mono text-lg font-bold text-blue-600">
                  {student.sbd}
                </p>
                <div className="text-sm space-y-1">
                  <div className="flex justify-between">
                    <span>Toán:</span>
                    <span className="font-semibold">
                      {formatScore(student.toan)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Vật lý:</span>
                    <span className="font-semibold">
                      {formatScore(student.vat_li)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Hóa học:</span>
                    <span className="font-semibold">
                      {formatScore(student.hoa_hoc)}
                    </span>
                  </div>
                </div>
                <div className="border-t pt-2">
                  <p className="text-2xl font-bold text-gray-900">
                    {formatScore(student.total_score)}
                  </p>
                  <p className="text-xs text-gray-500">Tổng điểm</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Full Table */}
      <Card>
        <CardHeader>
          <CardTitle>Bảng xếp hạng chi tiết</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16 text-center">Hạng</TableHead>
                  <TableHead>Số báo danh</TableHead>
                  <TableHead className="text-center">Toán</TableHead>
                  <TableHead className="text-center">Vật lý</TableHead>
                  <TableHead className="text-center">Hóa học</TableHead>
                  <TableHead className="text-center font-bold">
                    Tổng điểm
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {top_students.map((student) => (
                  <TableRow
                    key={student.sbd}
                    className={student.rank <= 3 ? "bg-gray-50" : ""}
                  >
                    <TableCell className="text-center">
                      <Badge
                        variant="outline"
                        className={getRankBadgeColor(student.rank)}
                      >
                        #{student.rank}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="font-mono font-semibold text-blue-600">
                        {student.sbd}
                      </div>
                    </TableCell>
                    <TableCell className="text-center font-semibold">
                      {formatScore(student.toan)}
                    </TableCell>
                    <TableCell className="text-center font-semibold">
                      {formatScore(student.vat_li)}
                    </TableCell>
                    <TableCell className="text-center font-semibold">
                      {formatScore(student.hoa_hoc)}
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="font-bold text-lg text-gray-900">
                        {formatScore(student.total_score)}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Stats Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Thống kê tổng quan</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-blue-600">
                {top_students[0]
                  ? formatScore(top_students[0].total_score)
                  : "--"}
              </p>
              <p className="text-sm text-gray-600">Điểm cao nhất</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600">
                {top_students[9]
                  ? formatScore(top_students[9].total_score)
                  : "--"}
              </p>
              <p className="text-sm text-gray-600">Điểm thứ 10</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-purple-600">
                {formatScore(
                  top_students.reduce((sum, s) => {
                    const score = parseScore(s.total_score);
                    return sum + (score || 0);
                  }, 0) / top_students.length
                )}
              </p>
              <p className="text-sm text-gray-600">Điểm TB top 10</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-orange-600">
                {top_students[0] && top_students[9]
                  ? formatScore(
                      (parseScore(top_students[0].total_score) || 0) -
                        (parseScore(top_students[9].total_score) || 0)
                    )
                  : "--"}
              </p>
              <p className="text-sm text-gray-600">Khoảng cách</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
