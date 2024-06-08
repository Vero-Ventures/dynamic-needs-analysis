import { z } from "zod";

export interface GoalsData {
  id: number;
  name: string;
  amount: number;
  philanthropic: boolean;
}

export const goalsData: GoalsData[] = [
  {
    id: 1,
    name: "Red Cross",
    amount: 250.0,
    philanthropic: true,
  },
  {
    id: 2,
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
