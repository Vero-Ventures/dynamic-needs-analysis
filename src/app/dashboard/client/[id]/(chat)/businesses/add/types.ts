import type { Tables } from "../../../../../../../../types/supabase";

export type EditShareholder = Omit<
  Tables<"shareholders">,
  "created_at" | "business_id" | "id"
>;
