import { z } from "zod";

export const createKeyPersonSchema = z.object({
  name: z.string(),
  insurance_coverage: z.coerce.number(),
  ebitda_contribution_percentage: z.coerce.number(),
  business: z.object({
    value: z.string(),
    label: z.string(),
  }),
});

export type CreateKeyPerson = z.infer<typeof createKeyPersonSchema>;

export const editKeyPersonSchema = createKeyPersonSchema;
export type EditKeyPerson = CreateKeyPerson;
