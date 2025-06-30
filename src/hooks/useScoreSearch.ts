import { useState } from "react";
import { scoreApi, getErrorMessage } from "@/lib/api";
import type { ScoreSearchRequest, ScoreSearchResponse } from "@/types";

export const useScoreSearch = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<ScoreSearchResponse | null>(null);

  const searchScore = async (searchData: ScoreSearchRequest) => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const response = await scoreApi.searchScore(searchData);
      setData(response);
      return response;
    } catch (err) {
      const errorMessage = getErrorMessage(err);
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const clearSearch = () => {
    setData(null);
    setError(null);
  };

  return {
    searchScore,
    clearSearch,
    loading,
    error,
    data,
  };
};
