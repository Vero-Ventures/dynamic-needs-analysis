import { goals } from "@/app/data/db";
import { assets } from "@/app/data/db";
import Goals from "./goals";
import Liquidity from "./liquidity";

export default function GoalsPage() {
  return (
    <>
      <div className="grid gap-4 p-4 xl:grid-cols-2">
        <Goals />
        <Liquidity goals={goals} assets={assets} />
      </div>
    </>
  );
}
