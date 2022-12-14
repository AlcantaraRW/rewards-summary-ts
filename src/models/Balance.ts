export interface WeekPoints {
  day: string;
  points: string;
}

export interface ItemToRedeem {
  quantity: number;
  cost: number;
  value: number;
}

export interface Balance {
  itemsToRedeem: ItemToRedeem[];
  totalWorth: number;
  remainingPoints: number;
  pointsToNextCard: number;
}
