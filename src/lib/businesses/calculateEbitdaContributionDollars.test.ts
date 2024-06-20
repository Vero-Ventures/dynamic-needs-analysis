import { test, expect } from "bun:test";
import { calculateEbitdaContributionDollars } from "./utils";
import type { Shareholder } from "@/types/db";

const testCases = [
  {
    shareholder: { ebitda_contribution_percentage: 10 } as Shareholder,
    ebitda: 1000,
    expected: 100,
  },
  {
    shareholder: { ebitda_contribution_percentage: 0 } as Shareholder,
    ebitda: 1000,
    expected: 0,
  },
  {
    shareholder: { ebitda_contribution_percentage: 101 } as Shareholder,
    ebitda: 2000,
    expected: "EBITDA contribution percentage must be between 0% and 100%",
  },
  {
    shareholder: { ebitda_contribution_percentage: -1 } as Shareholder,
    ebitda: 2000,
    expected: "EBITDA contribution percentage must be between 0% and 100%",
  },
];

testCases.forEach(({ shareholder, ebitda, expected }) => {
  test(`should return ${expected} for EBITDA ${ebitda} and contribution percentage ${shareholder.ebitda_contribution_percentage}`, () => {
    if (typeof expected === "string") {
      expect(() =>
        calculateEbitdaContributionDollars(shareholder, ebitda)
      ).toThrow(expected);
    } else {
      const result = calculateEbitdaContributionDollars(shareholder, ebitda);
      expect(result).toBe(expected);
    }
  });
});
