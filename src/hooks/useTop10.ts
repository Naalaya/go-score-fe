import useSWR from "swr";
import { scoreApi } from "@/lib/api";
import type { Top10Data } from "@/types";

// SWR fetcher function
const top10Fetcher = async () => {
  const response = await scoreApi.getTop10GroupA();
  return response.data;
};

export const useTop10 = () => {
  const { data, error, isLoading, mutate } = useSWR<Top10Data>(
    "top10-group-a",
    top10Fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      refreshInterval: 0, // Don't auto-refresh
      dedupingInterval: 300000, // Cache for 5 minutes (data doesn't change often)
    }
  );

  return {
    top10: data,
    loading: isLoading,
    error: error?.message || null,
    mutate, // For manual revalidation
  };
};
