import { test, expect } from "bun:test";
import { calculateCurrentGrowthDollars } from "./utils";

const testCases = [
  { initialValue: 100, currentValue: 150, expected: 50 },
  { initialValue: 200, currentValue: 100, expected: -100 },
  { initialValue: 0, currentValue: 0, expected: 0 },
];

testCases.forEach(({ initialValue, currentValue, expected }) => {
  test(`should return ${expected} dollars growth for initial value ${initialValue} and current value ${currentValue}`, () => {
    const result = calculateCurrentGrowthDollars(initialValue, currentValue);
    expect(result).toBe(expected);
  });
});
