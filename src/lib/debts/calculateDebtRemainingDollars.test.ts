import { test, expect } from "bun:test";
import { calculateDebtRemainingDollars } from "./utils";

const testCases = [
  { currentValueOfDebtDollars: 15000, amountPaidOffDollars: 5000, expected: 10000 },
  { currentValueOfDebtDollars: 5000, amountPaidOffDollars: 15000, expected: 0 },
  { currentValueOfDebtDollars: 15000, amountPaidOffDollars: 0, expected: 15000 },
];

testCases.forEach(({ currentValueOfDebtDollars, amountPaidOffDollars, expected }) => {
  test(`should return ${expected} for current value ${currentValueOfDebtDollars} and amount paid off ${amountPaidOffDollars}`, () => {
    const result = calculateDebtRemainingDollars(currentValueOfDebtDollars, amountPaidOffDollars);
    expect(result).toBe(expected);
  });
});
