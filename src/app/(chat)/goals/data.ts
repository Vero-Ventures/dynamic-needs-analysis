interface GoalsData {
  id: number;
  name: string;
  amount: number;
  philanthropic: boolean;
}

export const goalsData: GoalsData[] = [
  {
    id: 1,
    name: "Red Cross",
    amount: 250.0,
    philanthropic: true,
  },
  {
    id: 2,
    name: "Orange Cross",
    amount: 350.0,
    philanthropic: false,
  },
];
