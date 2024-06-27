import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Database } from "../../types/supabase";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import jwt from "jsonwebtoken";
import type { KindeIdToken } from "@kinde-oss/kinde-auth-nextjs/types";
import { redirect } from "next/navigation";

const getNewToken = async () => {
  const { getIdToken, refreshTokens } = getKindeServerSession();
  const idToken = await getIdToken();
  // Check if the token is expired
  if (!idToken) {
    redirect("/api/auth/logout");
  }
  if (isTokenExpired(idToken)) {
    // If the token is expired then we logout the user
    await refreshTokens();
    redirect("/dashboard/clients");
  }
  return idToken;
};

const isTokenExpired = (token: KindeIdToken) => {
  const currentTime = Math.floor(Date.now() / 1000);
  return token.exp < currentTime;
};

export const createClient = async () => {
  const idToken = await getNewToken();
  const cookieStore = cookies();
  const token = jwt.sign(idToken, process.env.SUPABASE_AUTH_JWT_SECRET!);
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch (error) {
            // The `set` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: "", ...options });
          } catch (error) {
            // Th `delete` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  );
};
