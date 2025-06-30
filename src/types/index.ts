// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  api_version?: string;
}

export interface ApiError {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
}

// Score Related Types
export interface Score {
  id: number;
  sbd: string;
  toan: number | string | null;
  ngu_van: number | string | null;
  ngoai_ngu: number | string | null;
  vat_li: number | string | null;
  hoa_hoc: number | string | null;
  sinh_hoc: number | string | null;
  lich_su: number | string | null;
  dia_li: number | string | null;
  gdcd: number | string | null;
  ma_ngoai_ngu?: string | null;
  grade_levels?: GradeLevels;
  total_group_a?: number | string | null;
}

export interface GradeLevels {
  [key: string]: {
    score: number | string;
    level: string;
    display_name: string;
  };
}

// Search Request Types
export interface ScoreSearchRequest {
  sbd: string;
  year?: number;
  include_statistics?: boolean;
  include_metadata?: boolean;
}

export interface ScoreSearchResponse {
  success: true;
  data: Score & {
    statistics?: StatisticsData;
    metadata?: {
      search_year?: number;
      searched_at: string;
      api_version: string;
    };
  };
}

// Statistics Types
export interface SubjectStatistic {
  subject_name: string;
  subject_code: string;
  excellent: number; // ≥8 điểm
  good: number; // 6-7.9 điểm
  average: number; // 4-5.9 điểm
  weak: number; // <4 điểm
  total: number;
  average_score: number;
  max_score: number;
  min_score: number;
  percentages?: {
    excellent: number;
    good: number;
    average: number;
    weak: number;
  };
}

export interface StatisticsData {
  statistics: SubjectStatistic[];
  summary: {
    total_students: number;
    total_subjects: number;
    generated_at: string;
  };
}

export interface StatisticsRequest {
  group_code?: "A" | "B" | "C" | "D";
  subject_codes?: string[];
  include_percentages?: boolean;
  format?: "json" | "csv";
}

// Top 10 Types
export interface Top10Student {
  rank: number;
  sbd: string;
  toan: number | string;
  vat_li: number | string;
  hoa_hoc: number | string;
  total_score: number | string;
}

export interface Top10Data {
  top_students: Top10Student[];
  group_name: string;
  subjects: string[];
}

// Subject Types
export interface Subject {
  id: number;
  code: string;
  display_name: string;
  group_code: string | null;
  order: number;
  is_active: boolean;
}

// Form Types
export interface SearchFormData {
  sbd: string;
}

// Common Types
export type GradeLevel = "excellent" | "good" | "average" | "weak";

export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}

// Chart Data Types
export interface ChartDataset {
  label: string;
  data: number[];
  backgroundColor: string[];
  borderColor: string[];
  borderWidth: number;
}

export interface ChartData {
  labels: string[];
  datasets: ChartDataset[];
}

// Navigation Types
export interface NavItem {
  href: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
}
