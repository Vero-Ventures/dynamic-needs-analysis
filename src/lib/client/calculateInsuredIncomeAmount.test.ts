import { test, expect } from "bun:test";
import { calculateInsuredIncomeAmount } from "./utils";

const testCases = [
  { annualIncome: 0, multiplier: 1, expected: 0, shouldThrow: false },
  { annualIncome: 50000, multiplier: 1, expected: 50000, shouldThrow: false },
  { annualIncome: 50000, multiplier: 2, expected: 100000, shouldThrow: false },
  {
    annualIncome: 50000,
    multiplier: 2.5,
    expected: 125000,
    shouldThrow: false,
  },
  { annualIncome: 0, multiplier: 1, expected: 0, shouldThrow: false },
  { annualIncome: 10000, multiplier: 0, expected: 0, shouldThrow: false },
  {
    annualIncome: -10000,
    multiplier: 0,
    expected: "Income and multiplier must be positive",
    shouldThrow: true,
  },
  {
    annualIncome: 0,
    multiplier: -5,
    expected: "Income and multiplier must be positive",
    shouldThrow: true,
  },
  {
    annualIncome: -75000,
    multiplier: 3,
    expected: "Income and multiplier must be positive",
    shouldThrow: true,
  },
  {
    annualIncome: 65000,
    multiplier: -3,
    expected: "Income and multiplier must be positive",
    shouldThrow: true,
  },
];

testCases.forEach(({ annualIncome, multiplier, expected, shouldThrow }) => {
  const description = shouldThrow
    ? `should throw an error when the annual income is ${annualIncome} and the multiplier is ${multiplier}`
    : `should return the amount insured for income of ${annualIncome} when the multiplier is ${multiplier}`;

  test(description, () => {
    if (shouldThrow) {
      expect(() =>
        calculateInsuredIncomeAmount(annualIncome, multiplier)
      ).toThrow(new Error(expected as string));
    } else {
      const insuredIncomeAmount = calculateInsuredIncomeAmount(
        annualIncome,
        multiplier
      );
      expect(insuredIncomeAmount).toBe(expected as number);
    }
  });
});
