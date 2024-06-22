"use server";
import { createClient } from "@/lib/supabase/server";
import { ownsClientProcedure } from "@/procedures/auth/actions";
import { revalidatePath } from "next/cache";
import { createAssetSchema } from "./schema";
import { z } from "zod";

export const createAsset = ownsClientProcedure
  .createServerAction()
  .input(createAssetSchema)
  .handler(async ({ input }) => {
    const sb = await createClient();
    const { error } = await sb.from("assets").insert(input);
    if (error) {
      console.error(error.message);
      throw new Error(
        "Something went wrong with adding the asset to the database"
      );
    }
    revalidatePath(`/dashboard/client/new/${input.client_id}`);
  });

export const deleteAsset = ownsClientProcedure
  .createServerAction()
  .input(z.object({ asset_id: z.number() }))
  .handler(async ({ input }) => {
    const sb = await createClient();
    const { error } = await sb.from("assets").delete().eq("id", input.asset_id);
    if (error) {
      console.error(error.message);
      throw new Error(
        "Something went wrong with deleting the asset from the database"
      );
    }
    revalidatePath(`/dashboard/client/new/${input.client_id}`);
  });
