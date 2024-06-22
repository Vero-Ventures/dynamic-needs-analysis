import { z } from "zod";

export const createGoalSchema = z.object({
  name: z.string().trim(),
  amount: z.coerce.number(),
  philanthropic: z.boolean(),
});

export type CreateGoal = z.infer<typeof createGoalSchema>;
