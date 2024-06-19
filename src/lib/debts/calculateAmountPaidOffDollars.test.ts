import { test, expect } from "bun:test";
import { calculateAmountPaidOffDollars } from "./utils";

const testCases = [
  { annualPayment: 1000, currentYearsHeld: 5, expected: 5000 },
  { annualPayment: 1000, currentYearsHeld: 0, expected: 0 },
  { annualPayment: 0, currentYearsHeld: 5, expected: 0 },
];

testCases.forEach(({ annualPayment, currentYearsHeld, expected }) => {
  test(`should return ${expected} for annual payment ${annualPayment} and years held ${currentYearsHeld}`, () => {
    const result = calculateAmountPaidOffDollars(annualPayment, currentYearsHeld);
    expect(result).toBe(expected);
  });
});
