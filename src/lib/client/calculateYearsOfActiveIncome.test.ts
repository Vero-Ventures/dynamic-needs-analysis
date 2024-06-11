import { test, expect } from "bun:test";
import { calculateYearsOfActiveIncome } from "./utils";

test("should return years of active income of 0 when the age is the same as the expected retirement age", () => {
  const age = 65;
  const expectedRetirementAge = 65;
  const yearsOfActiveIncome = calculateYearsOfActiveIncome(
    age,
    expectedRetirementAge,
  );

  expect(yearsOfActiveIncome).toBe(0);
});

test("should return years of active income of 10 when the age is 55 and the expected retirement age is 65", () => {
  const age = 55;
  const expectedRetirementAge = 65;
  const yearsOfActiveIncome = calculateYearsOfActiveIncome(
    age,
    expectedRetirementAge,
  );

  expect(yearsOfActiveIncome).toBe(10);
});

test("should return years of active income of 0 when the age is 75 and the expected retirement age is 65", () => {
  const age = 75;
  const expectedRetirementAge = 65;
  const yearsOfActiveIncome = calculateYearsOfActiveIncome(
    age,
    expectedRetirementAge,
  );

  expect(yearsOfActiveIncome).toBe(0);
});

test("should throw an error when the age is 20 and the expected retirement age is -65", () => {
  const age = 20;
  const expectedRetirementAge = -65;

  expect(() =>
    calculateYearsOfActiveIncome(age, expectedRetirementAge),
  ).toThrow(new Error("Age and retirement age must be positive"));
});
