import { test, expect } from "bun:test";
import { calculateLiquidationDisparity } from "./utils";
import type { Shareholder } from "@/types/db";

const testCases = [
  {
    shareholder: {
      share_percentage: 10,
      insurance_coverage: 50,
    } as Shareholder,
    valuation: 1000,
    expected: 50,
  },
  {
    shareholder: { share_percentage: 0, insurance_coverage: 50 } as Shareholder,
    valuation: 1000,
    expected: -50,
  },
  {
    shareholder: {
      share_percentage: 100,
      insurance_coverage: 1000,
    } as Shareholder,
    valuation: 1000,
    expected: 0,
  },
  {
    shareholder: {
      share_percentage: 50,
      insurance_coverage: 600,
    } as Shareholder,
    valuation: 1000,
    expected: -100,
  },
  {
    shareholder: {
      share_percentage: 101,
      insurance_coverage: 100,
    } as Shareholder,
    valuation: 1000,
    expected: "Share percentage must be between 0% and 100%",
  },
  {
    shareholder: {
      share_percentage: -1,
      insurance_coverage: 100,
    } as Shareholder,
    valuation: 1000,
    expected: "Share percentage must be between 0% and 100%",
  },
];

testCases.forEach(({ shareholder, valuation, expected }) => {
  test(`should return ${expected} for valuation ${valuation}, share percentage ${shareholder.share_percentage}, and insurance coverage ${shareholder.insurance_coverage}`, () => {
    if (typeof expected === "string") {
      expect(() =>
        calculateLiquidationDisparity(shareholder, valuation)
      ).toThrow(expected);
    } else {
      const result = calculateLiquidationDisparity(shareholder, valuation);
      expect(result).toBe(expected);
    }
  });
});
