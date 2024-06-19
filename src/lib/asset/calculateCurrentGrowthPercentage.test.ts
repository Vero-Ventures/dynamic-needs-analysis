import { test, expect } from "bun:test";
import { calculateCurrentGrowthPercentage } from "./utils";

const testCases = [
  { initialValue: 100, currentValue: 150, expected: 50 },
  { initialValue: 200, currentValue: 100, expected: -50 },
  { initialValue: 0, currentValue: 100, expected: 0 },
];

testCases.forEach(({ initialValue, currentValue, expected }) => {
  test(`should return ${expected}% growth for initial value ${initialValue} and current value ${currentValue}`, () => {
    const result = calculateCurrentGrowthPercentage(initialValue, currentValue);
    expect(result).toBe(expected);
  });
});
