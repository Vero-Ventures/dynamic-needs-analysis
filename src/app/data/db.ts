import { z } from "zod";

// === Goals Data and Schema ===

export interface GoalsData {
  id: number;
  name: string;
  amount: number;
  philanthropic: boolean;
}

export const goalsData: GoalsData[] = [
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

export const AddGoalSchema = z.object({
  name: z.string(),
  amount: z.coerce.number(),
  philanthropic: z.string(),
});

// === Beneficiaries Data and Schema ===

export interface BeneficiaryData {
  id: number;
  name: string;
  allocation: number;
}

export const beneficiariesData: BeneficiaryData[] = [
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

export const AddBeneficiarySchema = z.object({
  name: z.string(),
  allocation: z.coerce.number(),
});

// === Shareholder Data and Schema ===

export interface Shareholder {
  id: number;
  name: string;
  sharePercentage: number;
  insuranceCoverage: number;
  EBITDAPercentContribution: number;
  EBITDAContribution: number;
  shareValue: number;
  liquidationDisparity: number;
}

export const shareholders: Shareholder[] = [
  {
    id: 0,
    name: "Scott Chen",
    sharePercentage: 100,
    insuranceCoverage: 0,
    EBITDAPercentContribution: 100,
    EBITDAContribution: 0,
    shareValue: 0,
    liquidationDisparity: 0,
  },
];

export const AddShareholderSchema = z.object({
  name: z.string(),
  sharePercentage: z.coerce.number(),
  insuranceCoverage: z.coerce.number(),
  EBITDAPercentContribution: z.coerce.number(),
});
