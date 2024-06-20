import { test, expect } from "bun:test";
import { calculateTotalShareholderPercentageOwned } from "./utils";
import type { Shareholder } from "@/types/db";

const testCases = [
  {
    shareholders: [
      { share_percentage: 10 } as Shareholder,
      { share_percentage: 20 } as Shareholder,
      { share_percentage: 30 } as Shareholder,
    ],
    expected: 60,
  },
  {
    shareholders: [
      { share_percentage: 0 } as Shareholder,
      { share_percentage: 0 } as Shareholder,
    ],
    expected: 0,
  },
  {
    shareholders: [
      { share_percentage: 50 } as Shareholder,
      { share_percentage: 50 } as Shareholder,
    ],
    expected: 100,
  },
  {
    shareholders: [
      { share_percentage: 100 } as Shareholder,
      { share_percentage: 100 } as Shareholder,
    ],
    expected: 200,
  },
  {
    shareholders: [],
    expected: 0,
  },
];

testCases.forEach(({ shareholders, expected }) => {
  test(`should return ${expected} for shareholders with percentages ${shareholders.map((s) => s.share_percentage).join(", ")}`, () => {
    const result = calculateTotalShareholderPercentageOwned(shareholders);
    expect(result).toBe(expected);
  });
});
