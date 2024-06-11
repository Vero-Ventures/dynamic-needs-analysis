"use server";

import { businesses } from "@/app/data/db";
import { revalidatePath } from "next/cache";

// export async function addBusiness(data: FormData) {
//   const formData = Object.fromEntries(data.entries());
//   const parsed = AddBusinessSchema.safeParse(formData);
//   if (!parsed.success) {
//     const fields: Record<string, string> = {};
//     for (const key of Object.keys(formData)) {
//       fields[key] = formData[key].toString();
//     }
//     return { message: "Invalid form data", fields };
//   }
//   const { name, valuation } = parsed.data;

//   businesses.push({
//     id: businesses.length,
//     name,
//     valuation,
//   });
// }

export async function deleteBusiness(id: number) {
  const i = businesses.findIndex((s) => s.id === id);
  if (i === -1) {
    throw new Error("No shareholders found at this index");
  }
  businesses.splice(i, 1);
  revalidatePath("/dashboard/client/[id]/businesses", "page");
}
