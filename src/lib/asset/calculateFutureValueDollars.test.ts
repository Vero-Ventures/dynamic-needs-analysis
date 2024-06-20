import { test, expect } from "bun:test";
import { calculateFutureValueDollars } from "./utils";

const testCases = [
  { currentValue: 100, rate: 5, term: 10, expected: 162.89 },
  { currentValue: 200, rate: -5, term: 10, expected: 119.747 },
  { currentValue: 0, rate: 5, term: 10, expected: 0 },
];

testCases.forEach(({ currentValue, rate, term, expected }) => {
  test(`should return ${expected.toFixed(2)} dollars for current value ${currentValue}, rate ${rate}% and term ${term} years`, () => {
    const result = calculateFutureValueDollars(currentValue, rate, term);
    expect(result).toBeCloseTo(expected, 2);
  });
});
