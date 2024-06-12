import { debts } from "./db";

export default async function getDebt(id: number) {
  return debts.at(id);
}
