import { test, expect } from "bun:test";
import { calculateCurrentYearsHeld } from "./utils";

const currentYear = new Date().getFullYear();

const testCases = [
  { yearAcquired: currentYear, expected: 0 },
  { yearAcquired: currentYear - 10, expected: 10 },
  { yearAcquired: currentYear + 5, expected: -5 },
];

testCases.forEach(({ yearAcquired, expected }) => {
  test(`should return ${expected} years for year acquired ${yearAcquired}`, () => {
    const result = calculateCurrentYearsHeld(yearAcquired);
    expect(result).toBe(expected);
  });
});
