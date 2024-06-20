import { test, expect } from "bun:test";
import { calculateFutureValueGrowthPercentage } from "./utils";

const testCases = [
  { futureValueDollars: 150, initialValue: 100, expected: 50 },
  { futureValueDollars: 100, initialValue: 200, expected: -50 },
  { futureValueDollars: 100, initialValue: 0, expected: 0 },
];

testCases.forEach(({ futureValueDollars, initialValue, expected }) => {
  test(`should return ${expected}% growth for future value ${futureValueDollars} and initial value ${initialValue}`, () => {
    const result = calculateFutureValueGrowthPercentage(
      futureValueDollars,
      initialValue
    );
    expect(result).toBe(expected);
  });
});
