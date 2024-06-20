import { test, expect } from "bun:test";
import { calculateNumberOfPaymentPeriods } from "./utils";

const testCases = [
  {
    interestRate: 5,
    annualPayment: 2000,
    presentValue: 10000,
    expected: 5.8963,
  },
  { interestRate: 0, annualPayment: 2000, presentValue: 10000, expected: 5 },
  {
    interestRate: -5,
    annualPayment: 2000,
    presentValue: 10000,
    expected: 5.8963,
  },
];

testCases.forEach(({ interestRate, annualPayment, presentValue, expected }) => {
  test(`should return ${expected} for interest rate ${interestRate}, annual payment ${annualPayment}, and present value ${presentValue}`, () => {
    const result = calculateNumberOfPaymentPeriods(
      interestRate,
      annualPayment,
      presentValue
    );
    expect(result).toBeCloseTo(expected);
  });
});
