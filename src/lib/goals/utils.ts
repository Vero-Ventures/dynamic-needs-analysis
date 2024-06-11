import type { Goals } from "@/app/data/db";

export function calculateTotalSumGoals(data: Goals[]) {
  return data.reduce((total, goal) => total + goal.amount, 0);
}

export function calculateSurplusShortfall(
  liquidityAllocated: number,
  totalSumGoals: number,
) {
  return liquidityAllocated - totalSumGoals;
}
