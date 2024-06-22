import { z } from "zod";

export const createKeyPersonSchema = z.object({
  name: z.string(),
  insurance_coverage: z.coerce.number(),
  ebitda_contribution_percentage: z.coerce.number(),
  business: z.string(),
});

export type CreateKeyPerson = z.infer<typeof createKeyPersonSchema>;
