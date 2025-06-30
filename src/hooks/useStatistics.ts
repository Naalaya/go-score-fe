import useSWR from "swr";
import { scoreApi } from "@/lib/api";
import type { StatisticsData, StatisticsRequest } from "@/types";

// SWR fetcher function
const statisticsFetcher = async (url: string, params?: StatisticsRequest) => {
  const response = await scoreApi.getStatistics(params);
  return response.data;
};

export const useStatistics = (params?: StatisticsRequest) => {
  // Create a unique key for SWR based on parameters
  const key = params ? ["statistics", params] : ["statistics"];

  const { data, error, isLoading, mutate } = useSWR<StatisticsData>(
    key,
    () => statisticsFetcher("statistics", params),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      refreshInterval: 0, // Don't auto-refresh
      dedupingInterval: 60000, // Cache for 1 minute
    }
  );

  return {
    statistics: data,
    loading: isLoading,
    error: error?.message || null,
    mutate, // For manual revalidation
  };
};
