import Goals from "./goals";
import Liquidity from "./liquidity";

export default function GoalsPage() {
  return (
    <div className="flex flex-wrap gap-6 p-4">
      <Goals />
      <Liquidity />
    </div>
  );
}
