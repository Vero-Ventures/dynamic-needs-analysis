"use server";

import { createClient } from "@/lib/supabase/server";
import {
  ownsBusinessProcedure,
  ownsClientProcedure,
} from "@/procedures/auth/actions";
import { revalidatePath } from "next/cache";
import {
  createBusinessSchema,
  createKeyPersonSchema,
  createShareholderSchema,
} from "./schema";

export const createBusiness = ownsClientProcedure
  .createServerAction()
  .input(createBusinessSchema)
  .handler(async ({ input }) => {
    const sb = await createClient();
    const { error } = await sb.from("businesses").insert(input);

    if (error) {
      console.error(error.message);
      throw new Error(
        "Something went wrong with adding the business to the database"
      );
    }

    revalidatePath(`/dashboard/client/new/${input.client_id}`);
  });

export const createShareholder = ownsBusinessProcedure
  .createServerAction()
  .input(createShareholderSchema)
  .handler(async ({ input }) => {
    const sb = await createClient();
    const { error } = await sb.from("shareholders").insert(input);

    if (error) {
      console.error(error.message);
      throw new Error(
        "Something went wrong with adding the shareholders to the database"
      );
    }

    revalidatePath(`/dashboard/client/new/${input.client_id}`);
  });

export const createKeyPerson = ownsBusinessProcedure
  .createServerAction()
  .input(createKeyPersonSchema)
  .handler(async ({ input }) => {
    const sb = await createClient();
    const { error } = await sb.from("key_people").insert(input);

    if (error) {
      console.error(error.message);
      throw new Error(
        "Something went wrong with adding the key person to the database"
      );
    }

    revalidatePath(`/dashboard/client/new/${input.client_id}`);
  });
