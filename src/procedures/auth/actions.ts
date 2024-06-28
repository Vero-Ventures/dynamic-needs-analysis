import { createClient } from "@/lib/supabase/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { z } from "zod";
import { createServerActionProcedure } from "zsa";

export const authProcedure = createServerActionProcedure().handler(async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    throw new Error("User not authenticated");
  }
  return { user };
});

export const ownsClientProcedure = createServerActionProcedure(authProcedure)
  .input(z.object({ client_id: z.number() }))
  .handler(async ({ input, ctx }) => {
    const sb = await createClient();
    const { data: client, error } = await sb
      .from("clients")
      .select("id")
      .match({ id: input.client_id, kinde_id: ctx.user.id })
      .single();

    if (error) {
      throw new Error(error.message);
    }
    if (!client) {
      throw new Error("Invalid client id");
    }
    return {
      user: ctx.user,
      client_id: client.id,
    };
  });

export const ownsBusinessProcedure = createServerActionProcedure(
  ownsClientProcedure
)
  .input(z.object({ business_id: z.number() }))
  .handler(async ({ input, ctx }) => {
    const sb = await createClient();
    const { data: business, error } = await sb
      .from("businesses")
      .select("id")
      .match({ id: input.business_id, client_id: ctx.client_id })
      .single();

    if (error) {
      throw new Error(error.message);
    }
    if (!business) {
      throw new Error("Invalid business id");
    }
    return {
      user: ctx.user,
      client_id: ctx.client_id,
      business,
    };
  });
export const ownsShareholderProcedure = createServerActionProcedure(
  ownsBusinessProcedure
)
  .input(z.object({ shareholder_id: z.number() }))
  .handler(async ({ ctx }) => {
    return {
      user: ctx.user,
      client_id: ctx.client_id,
      business: ctx.business,
    };
  });
export const ownsKeyPersonProcedure = createServerActionProcedure(
  ownsBusinessProcedure
)
  .input(z.object({ key_person_id: z.number() }))
  .handler(async ({ ctx }) => {
    return {
      user: ctx.user,
      client_id: ctx.client_id,
      business: ctx.business,
    };
  });

export const ownsBeneficiaryProcedure = createServerActionProcedure(
  ownsClientProcedure
)
  .input(z.object({ beneficiary_id: z.number() }))
  .handler(async ({ input, ctx }) => {
    const sb = await createClient();
    const { data: beneficiary, error } = await sb
      .from("beneficiaries")
      .select("id")
      .match({ id: input.beneficiary_id, client_id: ctx.client_id })
      .single();

    if (error) {
      throw new Error(error.message);
    }
    if (!beneficiary) {
      throw new Error("Invalid beneficiary id");
    }
    return {
      user: ctx.user,
      client_id: ctx.client_id,
      beneficiary,
    };
  });
export const ownsDebtProcedure = createServerActionProcedure(
  ownsClientProcedure
)
  .input(z.object({ debt_id: z.number() }))
  .handler(async ({ input, ctx }) => {
    const sb = await createClient();
    const { data: beneficiary, error } = await sb
      .from("debts")
      .select("id")
      .match({ id: input.debt_id, client_id: ctx.client_id })
      .single();

    if (error) {
      throw new Error(error.message);
    }
    if (!beneficiary) {
      throw new Error("Invalid beneficiary id");
    }
    return {
      user: ctx.user,
      client_id: ctx.client_id,
      beneficiary,
    };
  });

export const ownsAssetProcedure = createServerActionProcedure(
  ownsBeneficiaryProcedure
)
  .input(z.object({ asset_id: z.number() }))
  .handler(async ({ input, ctx }) => {
    const sb = await createClient();
    const { data: asset, error } = await sb
      .from("assets")
      .select("id")
      .match({ id: input.asset_id, client_id: ctx.client_id })
      .single();

    if (error) {
      throw new Error(error.message);
    }
    if (!asset) {
      throw new Error("Invalid asset id");
    }
    return {
      user: ctx.user,
      client_id: ctx.client_id,
      asset,
      beneficiary: ctx.beneficiary,
    };
  });
