import { test, expect } from "bun:test";
import { calculateCurrentYearsHeld } from "./utils";

const testCases = [
  { yearAcquired: 2000, expected: new Date().getFullYear() - 2000 },
  { yearAcquired: 2010, expected: new Date().getFullYear() - 2010 },
  { yearAcquired: 2020, expected: new Date().getFullYear() - 2020 },
];

testCases.forEach(({ yearAcquired, expected }) => {
  test(`should return ${expected} years held for year acquired ${yearAcquired}`, () => {
    const result = calculateCurrentYearsHeld(yearAcquired);
    expect(result).toBe(expected);
  });
});
