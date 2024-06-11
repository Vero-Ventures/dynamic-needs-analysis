import { clients } from "./db";

export default async function getClient(id: number) {
  return clients.at(id);
}
