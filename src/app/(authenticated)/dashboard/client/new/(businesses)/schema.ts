import { z } from "zod";

export const createBusinessSchema = z.object({
  name: z.string().trim().min(3, "Your name must be greater than 3 characters"),
  valuation: z.coerce.number(),
  ebitda: z.coerce.number(),
  term: z.coerce.number(),
  appreciation_rate: z.coerce.number(),
});

export type CreateBusiness = z.infer<typeof createBusinessSchema>;

export const createShareholderSchema = z.object({
  name: z.string(),
  insurance_coverage: z.number(),
  share_percentage: z.number(),
});

export type CreateShareholder = z.infer<typeof createShareholderSchema>;

export const createKeyPersonSchema = z.object({
  name: z.string(),
  insurance_coverage: z.number(),
  ebitda_contribution_percentage: z.number(),
});

export type CreateKeyPerson = z.infer<typeof createKeyPersonSchema>;
