import { Reward } from '../models/Reward';

export const rewards: Reward[] = [
  {
    name: 'Microsoft Store',
    options: [
      { fullPrice: 11100, discountedPrice: 10300, value: 30 },
      { fullPrice: 5550, discountedPrice: 5250, value: 15 },
      { fullPrice: 1850, discountedPrice: 1750, value: 5 },
    ],
  },
  {
    name: 'Americanas',
    options: [
      { fullPrice: 24150, value: 100 },
      { fullPrice: 7250, value: 30 },
      { fullPrice: 4850, value: 20 },
    ],
  },
];
