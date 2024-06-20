import { test, expect } from "bun:test";
import { calculateCurrentValueOfDebtDollars } from "./utils";

const testCases = [
  {
    initialValue: 10000,
    interestRate: 5,
    currentYearsHeld: 3,
    expected: 11576.25,
  },
  {
    initialValue: 10000,
    interestRate: 5,
    currentYearsHeld: 0,
    expected: 10000,
  },
  {
    initialValue: 10000,
    interestRate: 0,
    currentYearsHeld: 3,
    expected: 10000,
  },
];

testCases.forEach(
  ({ initialValue, interestRate, currentYearsHeld, expected }) => {
    test(`should return ${expected} for initial value ${initialValue}, interest rate ${interestRate}, and years held ${currentYearsHeld}`, () => {
      const result = calculateCurrentValueOfDebtDollars(
        initialValue,
        interestRate,
        currentYearsHeld
      );
      expect(result).toBeCloseTo(expected);
    });
  }
);
