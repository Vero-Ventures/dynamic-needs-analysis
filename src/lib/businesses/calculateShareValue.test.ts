import { test, expect } from "bun:test";
import { calculateShareValue } from "./utils";
import type { Shareholder } from "@/types/db";

const testCases = [
  {
    shareholder: { share_percentage: 10 } as Shareholder,
    valuation: 1000,
    expected: 100,
  },
  {
    shareholder: { share_percentage: 0 } as Shareholder,
    valuation: 1000,
    expected: 0,
  },
  {
    shareholder: { share_percentage: 101 } as Shareholder,
    valuation: 2000,
    expected: "Share percentage must be between 0% and 100%",
  },
  {
    shareholder: { share_percentage: -1 } as Shareholder,
    valuation: 2000,
    expected: "Share percentage must be between 0% and 100%",
  },
];

testCases.forEach(({ shareholder, valuation, expected }) => {
  test(`should return ${expected} for valuation ${valuation} and share percentage ${shareholder.share_percentage}`, () => {
    if (typeof expected === "string") {
      expect(() => calculateShareValue(shareholder, valuation)).toThrow(
        expected
      );
    } else {
      const result = calculateShareValue(shareholder, valuation);
      expect(result).toBe(expected);
    }
  });
});
