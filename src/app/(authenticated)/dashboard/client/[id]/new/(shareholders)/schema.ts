import { z } from "zod";

export const createShareholderSchema = z.object({
  name: z.string(),
  insurance_coverage: z.number(),
  share_percentage: z.number(),
});

export type CreateShareholder = z.infer<typeof createShareholderSchema>;
