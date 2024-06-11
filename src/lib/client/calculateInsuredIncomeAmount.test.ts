import { test, expect } from "bun:test";
import { calculateInsuredIncomeAmount } from "./utils";

test("should return the amount insured for income of 0 when the annual income is 0 and the multiplier is 1", () => {
  const annualIncome = 0;
  const incomeReplacementMultiplier = 1;
  const insuredIncomeAmount = calculateInsuredIncomeAmount(
    annualIncome,
    incomeReplacementMultiplier,
  );

  expect(insuredIncomeAmount).toBe(0);
});

test("should throw an error when the annual income is 0 and the multiplier is -5", () => {
  const annualIncome = 0;
  const incomeReplacementMultiplier = -5;

  expect(() =>
    calculateInsuredIncomeAmount(annualIncome, incomeReplacementMultiplier),
  ).toThrow(new Error("Income and multiplier must be positive"));
});

test("should return the amount insured for income of 50000 when the annual income is 50000 and the multiplier is 1", () => {
  const annualIncome = 50000;
  const incomeReplacementMultiplier = 1;
  const insuredIncomeAmount = calculateInsuredIncomeAmount(
    annualIncome,
    incomeReplacementMultiplier,
  );

  expect(insuredIncomeAmount).toBe(50000);
});

test("should return the amount insured for income of 50000 when the annual income is 50000 and the multiplier is 2", () => {
  const annualIncome = 50000;
  const incomeReplacementMultiplier = 2;
  const insuredIncomeAmount = calculateInsuredIncomeAmount(
    annualIncome,
    incomeReplacementMultiplier,
  );

  expect(insuredIncomeAmount).toBe(100000);
});

test("should throw an error when the annual income is -75000 and the multiplier is 3", () => {
  const annualIncome = -75000;
  const incomeReplacementMultiplier = 3;

  expect(() =>
    calculateInsuredIncomeAmount(annualIncome, incomeReplacementMultiplier),
  ).toThrow(new Error("Income and multiplier must be positive"));
});

test("should throw an error when the annual income is 65000 and the multiplier is -3", () => {
  const annualIncome = 65000;
  const incomeReplacementMultiplier = -3;

  expect(() =>
    calculateInsuredIncomeAmount(annualIncome, incomeReplacementMultiplier),
  ).toThrow(new Error("Income and multiplier must be positive"));
});

test("should return the amount insured for income of 50000 when the annual income is 50000 and the multiplier is 2.5", () => {
  const annualIncome = 50000;
  const incomeReplacementMultiplier = 2.5;
  const insuredIncomeAmount = calculateInsuredIncomeAmount(
    annualIncome,
    incomeReplacementMultiplier,
  );

  expect(insuredIncomeAmount).toBe(125000);
});
