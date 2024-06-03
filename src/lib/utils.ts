import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateAgeFromDate(date: string) {
  throw new Error("Not yet implemented");
}

export function calculateYearsOfActiveIncome(
  age: number,
  expectedRetirementAge: number,
) {
  return expectedRetirementAge - age;
}

export function calculateInsuredIncomeAmount(
  annualIncome: number,
  incomeReplacementMultiplier: number,
) {
  return annualIncome * incomeReplacementMultiplier;
}
