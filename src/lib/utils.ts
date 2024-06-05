import { ProvinceInitials } from "@/constants/provinces";
import { TAX_BRACKETS, TaxBracket } from "@/constants/tax";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateAgeFromDate(birthDate: Date): number {
  const birthDateObj = new Date(birthDate);
  const today = new Date();
  const age = today.getFullYear() - birthDateObj.getFullYear();
  // Check if birthday hasn't happened this year yet
  const month = today.getMonth();
  const birthMonth = birthDateObj.getMonth();
  if (
    month < birthMonth ||
    (month === birthMonth && today.getDate() < birthDateObj.getDate())
  ) {
    return age - 1;
  }
  return age;
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

export function findSelectedBracket(
  province: ProvinceInitials,
  annualIncome: number,
): TaxBracket {
  const result = TAX_BRACKETS[province].find(
    (bracket: TaxBracket, index: number, array: TaxBracket[]) => {
      const nextBracket: TaxBracket = array[index + 1];
      return (
        annualIncome >= bracket.minIncome &&
        (!nextBracket || annualIncome < nextBracket.minIncome)
      );
    },
  );
  if (!result) {
    throw new Error("No bracket found");
  }
  return result;
}
