"use server";

import { createClient } from "@/lib/supabase/server";
import {
  ownsClientProcedure,
  ownsGoalProcedure,
} from "@/procedures/auth/actions";
import { revalidatePath } from "next/cache";
import {
  createGoalSchema,
  editGoalSchema,
  editLiquidityAllocatedTowardsGoalsSchema,
} from "./schema";
import { z } from "zod";

export const createGoal = ownsClientProcedure
  .createServerAction()
  .input(createGoalSchema)
  .handler(async ({ input }) => {
    const sb = await createClient();
    const { error } = await sb.from("goals").insert(input);

    if (error) {
      console.error(error.message);
      throw new Error(
        "Something went wrong with adding the goal to the database"
      );
    }

    revalidatePath(`/dashboard/client/${input.client_id}/edit`);
  });

export const editGoal = ownsGoalProcedure
  .createServerAction()
  .input(editGoalSchema)
  .handler(async ({ input }) => {
    const sb = await createClient();
    const { error } = await sb
      .from("goals")
      .update({
        name: input.name,
        amount: input.amount,
        philanthropic: input.philanthropic,
      })
      .match({ id: input.goal_id, client_id: input.client_id });

    if (error) {
      console.error(error.message);
      throw new Error(
        "Something went wrong with updating the goal in the database"
      );
    }

    revalidatePath(`/dashboard/client/${input.client_id}/edit`);
  });

export const deleteGoal = ownsClientProcedure
  .createServerAction()
  .input(z.object({ goal_id: z.number() }))
  .handler(async ({ input }) => {
    const sb = await createClient();
    const { error } = await sb.from("goals").delete().eq("id", input.goal_id);

    if (error) {
      console.error(error.message);
      throw new Error(
        "Something went wrong with deleting the goal from the database"
      );
    }

    revalidatePath(`/dashboard/client/${input.client_id}/edit`);
  });

export const editLiquidityAllocatedTowardsGoals = ownsClientProcedure
  .createServerAction()
  .input(editLiquidityAllocatedTowardsGoalsSchema)
  .handler(async ({ input }) => {
    const sb = await createClient();
    const { error } = await sb
      .from("clients")
      .update({
        liquidity_allocated_towards_goals:
          input.liquidity_allocated_towards_goals,
      })
      .eq("id", input.client_id);
    if (error) {
      console.log(error);
      throw new Error(
        "Something went wrong with updating the client in the database"
      );
    }

    revalidatePath(`/dashboard/client/${input.client_id}/edit`);
  });
