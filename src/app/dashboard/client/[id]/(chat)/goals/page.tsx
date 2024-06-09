import Goals from "./goals";
import Liquidity from "./liquidity";

export default function GoalsPage() {
  return (
    <div className="grid gap-4 p-4 xl:grid-cols-2">
      <Goals />
      <Liquidity />
    </div>
  );
}
