"use server";
import { clients } from "../../../../../../data/db";

export default async function getClient(id: number) {
  return clients.at(id);
}
