import type { CreateClient } from "@/app/(authenticated)/dashboard/clients/schema";
import { createClientSchema } from "@/app/(authenticated)/dashboard/clients/schema";

export const editClientSchema = createClientSchema;

export type EditClient = CreateClient;
