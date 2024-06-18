import type { Tables } from "../../../../../../../types/supabase";

export type EditShareholder = Omit<Tables<"shareholders">, "business_id">;
