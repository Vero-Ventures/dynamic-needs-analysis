import { z } from "zod";

export const createGoalSchema = z.object({
  name: z.string().trim(),
  amount: z.coerce.number(),
  philanthropic: z.boolean(),
});

export type CreateGoal = z.infer<typeof createGoalSchema>;

export const editLiquidityAllocatedTowardsGoalsSchema = z.object({
  liquidity_allocated_towards_goals: z.coerce.number(),
});

export type EditLiquidityAllocatedTowardsGoals = z.infer<
  typeof editLiquidityAllocatedTowardsGoalsSchema
>;
