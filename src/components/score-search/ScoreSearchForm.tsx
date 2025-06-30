"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Search, Loader2, Clock, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Alert, AlertDescription } from "@/components/ui/alert";

const searchSchema = z.object({
  sbd: z
    .string()
    .min(1, "Vui lòng nhập số báo danh")
    .regex(/^[0-9]{8,10}$/, "Số báo danh phải gồm 8-10 chữ số"),
});

type SearchFormData = z.infer<typeof searchSchema>;

interface ScoreSearchFormProps {
  onSearch: (sbd: string) => Promise<void>;
  loading: boolean;
  error: string | null;
  compact?: boolean;
}

export default function ScoreSearchForm({
  onSearch,
  loading,
  error,
  compact = false,
}: ScoreSearchFormProps) {
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [isClient, setIsClient] = useState(false);

  // Fix hydration error by only showing recent searches after client mount
  useEffect(() => {
    setIsClient(true);
    const saved = localStorage.getItem("recentSearches");
    if (saved) {
      try {
        setRecentSearches(JSON.parse(saved));
      } catch {
        setRecentSearches([]);
      }
    }
  }, []);

  const form = useForm<SearchFormData>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      sbd: "",
    },
  });

  const handleSubmit = async (data: SearchFormData) => {
    try {
      await onSearch(data.sbd);

      // Save to recent searches
      const newRecentSearches = [
        data.sbd,
        ...recentSearches.filter((s) => s !== data.sbd),
      ].slice(0, 5);
      setRecentSearches(newRecentSearches);
      localStorage.setItem("recentSearches", JSON.stringify(newRecentSearches));
    } catch {
      // Error is handled by parent component
    }
  };

  const handleRecentSearch = (sbd: string) => {
    form.setValue("sbd", sbd);
    onSearch(sbd);
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem("recentSearches");
  };

  return (
    <div className={compact ? "w-full" : "max-w-2xl mx-auto"}>
      <Card className="card-modern">
        <CardHeader className={`text-center ${compact ? "pb-4" : "pb-6"}`}>
          <div
            className={`${
              compact ? "w-12 h-12" : "w-16 h-16"
            } bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4`}
          >
            <Search
              className={`${compact ? "h-6 w-6" : "h-8 w-8"} text-white`}
            />
          </div>
          <CardTitle
            className={`${
              compact ? "text-xl" : "text-2xl"
            } font-bold text-gray-900`}
          >
            {compact ? "Tra cứu điểm thi" : "Tra cứu điểm thi THPT 2024"}
          </CardTitle>
          {!compact && (
            <p className="text-gray-600 mt-2">
              Nhập số báo danh để xem kết quả chi tiết
            </p>
          )}
        </CardHeader>

        <CardContent className={`space-y-${compact ? "4" : "6"}`}>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className={`space-y-${compact ? "4" : "6"}`}
            >
              <FormField
                control={form.control}
                name="sbd"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      className={`${
                        compact ? "text-sm" : "text-base"
                      } font-semibold text-gray-900`}
                    >
                      Số báo danh
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Nhập số báo danh (8-10 chữ số)"
                        className={`input-modern ${
                          compact ? "h-12 text-base" : "h-14 text-lg"
                        }`}
                        maxLength={10}
                        autoComplete="off"
                        disabled={loading}
                      />
                    </FormControl>
                    <FormMessage className="text-sm mt-1" />
                  </FormItem>
                )}
              />

              {error && (
                <Alert
                  variant="destructive"
                  className="animate-fade-in border-red-200 bg-red-50"
                >
                  <AlertDescription className="text-sm text-red-800">
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                disabled={loading}
                className={`w-full ${
                  compact ? "h-12 text-base" : "h-14 text-lg"
                } font-semibold btn-primary`}
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-3 animate-spin" />
                    Đang tìm kiếm...
                  </>
                ) : (
                  <>
                    <Search className="h-5 w-5 mr-3" />
                    Tra cứu điểm thi
                    <ArrowRight className="h-5 w-5 ml-3" />
                  </>
                )}
              </Button>
            </form>
          </Form>

          {/* Recent Searches - Only show when not compact */}
          {!compact && isClient && recentSearches.length > 0 && (
            <div className="animate-fade-in">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-base font-semibold text-gray-900 flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-600" />
                  Tìm kiếm gần đây
                </h4>
                <button
                  onClick={clearRecentSearches}
                  className="text-sm text-gray-500 hover:text-red-600 transition-colors flex items-center gap-1"
                >
                  <X className="h-3 w-3" />
                  Xóa tất cả
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((sbd, index) => (
                  <button
                    key={sbd}
                    onClick={() => handleRecentSearch(sbd)}
                    className="px-4 py-2 bg-gray-100 hover:bg-blue-100 hover:text-blue-700 text-gray-700 rounded-xl transition-all duration-200 hover:scale-105 disabled:opacity-50 font-medium"
                    disabled={loading}
                    style={{
                      animationDelay: `${index * 50}ms`,
                      animation: "fadeIn 0.3s ease-out forwards",
                    }}
                  >
                    {sbd}
                  </button>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Help Text for Compact Mode */}
      {compact && (
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Nhập số báo danh khác để tra cứu tiếp
          </p>
        </div>
      )}
    </div>
  );
}
