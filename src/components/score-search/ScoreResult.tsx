import { Trophy, Award, Medal, Target, User, BookOpen } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { parseScore, formatScore } from "@/lib/utils";
import type { Score } from "@/types";

interface ScoreResultProps {
  score: Score;
}

const subjectMapping = {
  toan: "Toán",
  ngu_van: "Ngữ văn",
  ngoai_ngu: "Ngoại ngữ",
  vat_li: "Vật lý",
  hoa_hoc: "Hóa học",
  sinh_hoc: "Sinh học",
  lich_su: "Lịch sử",
  dia_li: "Địa lý",
  gdcd: "GDCD",
};

const getGradeLevelColor = (level: string) => {
  switch (level) {
    case "Giỏi":
      return "bg-green-100 text-green-800 border-green-200";
    case "Khá":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "Trung bình":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "Yếu":
      return "bg-red-100 text-red-800 border-red-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

const getGradeLevelIcon = (level: string) => {
  switch (level) {
    case "Giỏi":
      return Trophy;
    case "Khá":
      return Award;
    case "Trung bình":
      return Medal;
    case "Yếu":
      return Target;
    default:
      return BookOpen;
  }
};

export default function ScoreResult({ score }: ScoreResultProps) {
  // Get all subjects from grade_levels (includes subjects that might be null in direct score fields)
  const subjects = Object.keys(score.grade_levels || {})
    .map((key) => {
      const subjectName =
        subjectMapping[key as keyof typeof subjectMapping] || key;
      const directScore = score[key as keyof Score] as number | string | null;
      const gradeLevel = score.grade_levels?.[key];

      // Use score from grade_levels if direct score is null
      const finalScore =
        directScore !== null ? directScore : gradeLevel?.score ?? null;

      return {
        code: key,
        name: subjectName,
        score: parseScore(finalScore),
        gradeLevel: gradeLevel,
      };
    })
    .filter((subject) => subject.score !== null && subject.gradeLevel);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Student Info Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-6 w-6" />
            Thông tin thí sinh
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Số báo danh</p>
              <p className="text-2xl font-bold text-blue-600">{score.sbd}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Mã ngoại ngữ</p>
              <p className="text-lg font-semibold">
                {score.ma_ngoai_ngu || "N/A"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Group A Score (if available) */}
      {score.total_group_a && (
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-700">
              <Trophy className="h-6 w-6" />
              Tổng điểm Khối A (Toán + Lý + Hóa)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <p className="text-4xl font-bold text-blue-600 mb-2">
                {formatScore(score.total_group_a)}
              </p>
              <p className="text-sm text-gray-600">điểm</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Detailed Scores */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-6 w-6" />
            Điểm chi tiết theo môn
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {subjects.map((subject) => {
              const GradeLevelIcon = getGradeLevelIcon(
                subject.gradeLevel?.level || ""
              );

              return (
                <div
                  key={subject.code}
                  className="p-4 rounded-lg border bg-white hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">
                      {subject.name}
                    </h4>
                    <GradeLevelIcon className="h-4 w-4 text-gray-400" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-gray-900">
                        {formatScore(subject.score)}
                      </span>
                      <span className="text-sm text-gray-500">điểm</span>
                    </div>

                    {subject.gradeLevel && (
                      <Badge
                        variant="outline"
                        className={`${getGradeLevelColor(
                          subject.gradeLevel.level
                        )} text-xs`}
                      >
                        {subject.gradeLevel.level}
                      </Badge>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Tổng quan kết quả</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-green-600">
                {subjects.filter((s) => s.gradeLevel?.level === "Giỏi").length}
              </p>
              <p className="text-sm text-gray-600">Môn giỏi</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-600">
                {subjects.filter((s) => s.gradeLevel?.level === "Khá").length}
              </p>
              <p className="text-sm text-gray-600">Môn khá</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-yellow-600">
                {
                  subjects.filter((s) => s.gradeLevel?.level === "Trung bình")
                    .length
                }
              </p>
              <p className="text-sm text-gray-600">Môn TB</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-red-600">
                {subjects.filter((s) => s.gradeLevel?.level === "Yếu").length}
              </p>
              <p className="text-sm text-gray-600">Môn yếu</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
