import { test, expect } from "bun:test";
import { calculateFutureValueOfActualTermDebtDollars } from "./utils";

const testCases = [
  { initialValue: 10000, interestRate: 5, term: 10, expected: 16288.95 },
  { initialValue: 10000, interestRate: 0, term: 10, expected: 10000 },
  { initialValue: 10000, interestRate: 5, term: 0, expected: 10000 },
];

testCases.forEach(({ initialValue, interestRate, term, expected }) => {
  test(`should return ${expected} for initial value ${initialValue}, interest rate ${interestRate}, and term ${term}`, () => {
    const result = calculateFutureValueOfActualTermDebtDollars(initialValue, interestRate, term);
    expect(result).toBeCloseTo(expected);
  });
});
