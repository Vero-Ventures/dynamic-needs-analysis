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
