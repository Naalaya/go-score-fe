import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Utility function to safely convert score to number
export function parseScore(score: number | string | null): number | null {
  if (score === null || score === undefined) {
    return null;
  }

  if (typeof score === "number") {
    return score;
  }

  if (typeof score === "string") {
    const parsed = parseFloat(score);
    return isNaN(parsed) ? null : parsed;
  }

  return null;
}

// Utility function to format score for display
export function formatScore(score: number | string | null): string {
  const parsed = parseScore(score);
  return parsed !== null ? parsed.toFixed(2) : "--";
}
