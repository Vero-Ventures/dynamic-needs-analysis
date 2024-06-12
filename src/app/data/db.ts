import type { ProvinceInitials } from "@/constants/provinces";
import type { TaxBracket } from "@/constants/tax";
import { z } from "zod";

// === Client Data and Schema ===

export interface ClientData {
  id: number;
  name: string;
  birthDate: Date;
  expectedRetirementAge: number;
  province: ProvinceInitials;
  annualIncome: number;
  incomeMultiplier: number;
}

export const clients: ClientData[] = [
  {
    id: 0,
    name: "John Doe",
    birthDate: new Date(),
    expectedRetirementAge: 65,
    province: "BC",
    annualIncome: 0,
    incomeMultiplier: 0,
  },
];

// === Goals Data and Schema ===

export interface Goals {
  id: number;
  name: string;
  amount: number;
  philanthropic: boolean;
}

export const goals: Goals[] = [
  {
    id: 0,
    name: "Red Cross",
    amount: 250.0,
    philanthropic: true,
  },
  {
    id: 1,
    name: "Orange Cross",
    amount: 350.0,
    philanthropic: false,
  },
];

// === Beneficiaries Data and Schema ===

export interface Beneficiary {
  id: number;
  name: string;
  allocation: number;
}

export const beneficiaries: Beneficiary[] = [
  {
    id: 0,
    name: "John Harrison",
    allocation: 25,
  },
  {
    id: 1,
    name: "James Smith",
    allocation: 50,
  },
];

export const BeneficiarySchema = z.object({
  name: z.string(),
  allocation: z.coerce.number(),
});

// === Business Data and Schema ===

export interface Shareholder {
  id: number;
  name: string;
  sharePercentage: number;
  insuranceCoverage: number;
  ebitdaContributionPercentage: number;
}

export interface Business {
  id: number;
  name: string;
  valuation: number;
  ebitda: number;
  appreciationRate: number;
  term: number;
  shareholders: Shareholder[];
}

export const businesses: Business[] = [
  {
    id: 0,
    name: "Vero Ventures",
    valuation: 1000,
    ebitda: 0,
    appreciationRate: 0,
    term: 0,
    shareholders: [
      {
        id: 0,
        name: "John Doe",
        sharePercentage: 100,
        insuranceCoverage: 0,
        ebitdaContributionPercentage: 100,
      },
    ],
  },
];

// === Debts Data and Schema ===

export interface Debt {
  id: number;
  name: string;
  initialValue: number;
  yearAcquired: number;
  rate: number;
  term: number;
  annualPayment: number;
  insurableFutureValueDollars: number;
}

export const debts: Debt[] = [
  {
    id: 0,
    name: "Bank Loan",
    initialValue: 100000,
    yearAcquired: 2020,
    rate: 5,
    term: 30,
    annualPayment: 10000,
    insurableFutureValueDollars: 392194.24,
  },
];

export interface Asset {
  name: string;
  initialValue: number;
  currentValue: number;
  yearAcquired: number;
  rate: number;
  term: number;
  type: string;
  isTaxable: boolean;
  isLiquid: boolean;
  isToBeSold: boolean;
  beneficiaries: Beneficiary[];
  selectedTaxBracket: TaxBracket | undefined;
  capitalGainsTaxRate: number;
  futureTaxLiabilityDollars?: number;
}
