import { test, expect } from "bun:test";
import { calculateYearsToBePaidOff } from "./utils";

const testCases = [
  {
    interestRate: 5,
    annualPayment: 2000,
    debtRemainingDollars: 10000,
    expected: 5.8963,
  },
  {
    interestRate: 5,
    annualPayment: 0,
    debtRemainingDollars: 10000,
    expected: 0,
  },
  {
    interestRate: 5,
    annualPayment: 2000,
    debtRemainingDollars: 0,
    expected: 0,
  },
];

testCases.forEach(
  ({ interestRate, annualPayment, debtRemainingDollars, expected }) => {
    test(`should return ${expected} for interest rate ${interestRate}, annual payment ${annualPayment}, and debt remaining ${debtRemainingDollars}`, () => {
      const result = calculateYearsToBePaidOff(
        interestRate,
        annualPayment,
        debtRemainingDollars
      );
      expect(result).toBeCloseTo(expected);
    });
  }
);
