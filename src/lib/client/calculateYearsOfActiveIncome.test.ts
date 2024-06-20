import { test, expect } from "bun:test";
import { calculateYearsOfActiveIncome } from "./utils";

const testCases = [
  { age: 65, expectedRetirementAge: 65, expected: 0, shouldThrow: false },
  { age: 55, expectedRetirementAge: 65, expected: 10, shouldThrow: false },
  { age: 75, expectedRetirementAge: 65, expected: 0, shouldThrow: false },
  {
    age: -20,
    expectedRetirementAge: 65,
    expected: "Age and retirement age must be positive",
    shouldThrow: true,
  },
  {
    age: 20,
    expectedRetirementAge: -65,
    expected: "Age and retirement age must be positive",
    shouldThrow: true,
  },
];

testCases.forEach(({ age, expectedRetirementAge, expected, shouldThrow }) => {
  const description = shouldThrow
    ? `should throw an error when the age is ${age} and the expected retirement age is ${expectedRetirementAge} that says ${expected}`
    : `should return years of active income of ${expected} when the age is ${age} and the expected retirement age is ${expectedRetirementAge}`;

  test(description, () => {
    if (shouldThrow) {
      expect(() =>
        calculateYearsOfActiveIncome(age, expectedRetirementAge)
      ).toThrow(new Error(expected as string));
    } else {
      const yearsOfActiveIncome = calculateYearsOfActiveIncome(
        age,
        expectedRetirementAge
      );
      expect(yearsOfActiveIncome).toBe(expected as number);
    }
  });
});
