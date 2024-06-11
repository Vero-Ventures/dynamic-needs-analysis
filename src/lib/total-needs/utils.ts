export function calculateWant(need: number, priority: number) {
  if (need < 0 || priority < 0 || priority > 100) {
    throw new Error(
      "Need and priority must be positive, and priority must be less than or equal to 100",
    );
  }
  const priorityInDecimal = priority / 100;
  return need * priorityInDecimal;
}
