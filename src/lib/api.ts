import axios, { AxiosResponse } from "axios";
import type {
  ApiResponse,
  ApiError,
  ScoreSearchRequest,
  ScoreSearchResponse,
  StatisticsData,
  StatisticsRequest,
  Top10Data,
  Subject,
} from "@/types";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 30000, // 30 seconds
});

apiClient.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error("API Request Error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    console.log(`API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error("API Response Error:", error);

    if (error.response?.status === 422) {
      // Validation errors
      const validationError: ApiError = {
        success: false,
        message: error.response.data.message || "Validation failed",
        errors: error.response.data.errors,
      };
      return Promise.reject(validationError);
    }

    if (error.response?.status === 404) {
      // Not found
      const notFoundError: ApiError = {
        success: false,
        message: error.response.data.message || "Resource not found",
      };
      return Promise.reject(notFoundError);
    }

    if (error.response?.status >= 500) {
      const serverError: ApiError = {
        success: false,
        message: "Server error occurred. Please try again later.",
      };
      return Promise.reject(serverError);
    }

    const networkError: ApiError = {
      success: false,
      message: error.message || "Network error occurred",
    };
    return Promise.reject(networkError);
  }
);

export const scoreApi = {
  searchScore: async (
    data: ScoreSearchRequest
  ): Promise<ScoreSearchResponse> => {
    const response: AxiosResponse<ScoreSearchResponse> = await apiClient.post(
      "/scores/search",
      {
        sbd: data.sbd,
        year: data.year,
        include_statistics: data.include_statistics ?? true,
        include_metadata: data.include_metadata ?? true,
      }
    );
    return response.data;
  },

  getStatistics: async (
    params?: StatisticsRequest
  ): Promise<ApiResponse<StatisticsData>> => {
    const response: AxiosResponse<ApiResponse<StatisticsData>> =
      await apiClient.get("/scores/statistics", {
        params: {
          group_code: params?.group_code,
          subject_codes: params?.subject_codes,
          include_percentages: params?.include_percentages ?? true,
          format: params?.format ?? "json",
        },
      });
    return response.data;
  },

  getTop10GroupA: async (): Promise<ApiResponse<Top10Data>> => {
    const response: AxiosResponse<ApiResponse<Top10Data>> = await apiClient.get(
      "/scores/top10-group-a"
    );
    return response.data;
  },

  getSubjects: async (): Promise<ApiResponse<Subject[]>> => {
    const response: AxiosResponse<ApiResponse<Subject[]>> = await apiClient.get(
      "/subjects"
    );
    return response.data;
  },
};

export { apiClient };

export const isApiError = (error: unknown): error is ApiError => {
  return !!(
    error &&
    typeof error === "object" &&
    error !== null &&
    "success" in error &&
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (error as any).success === false
  );
};

export const getErrorMessage = (error: unknown): string => {
  if (isApiError(error)) {
    return error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "An unexpected error occurred";
};

export const getValidationErrors = (
  error: unknown
): Record<string, string[]> | null => {
  if (isApiError(error) && error.errors) {
    return error.errors;
  }
  return null;
};
