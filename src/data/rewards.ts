import { Reward } from "../models/Reward";

export const rewards: Reward[] = [
  {
    name: "Microsoft Store",
    options: [
      { fullPrice: 7500, discountedPrice: 7125, value: 30, quantity: 0 },
      { fullPrice: 3750, discountedPrice: 3565, value: 15, quantity: 0 },
      { fullPrice: 1500, discountedPrice: 1375, value: 5, quantity: 0 },
    ],
  },
  {
    name: "Via Cartão Presente",
    options: [
      { fullPrice: 32500, value: 100, quantity: 0 },
      { fullPrice: 16050, value: 50, quantity: 0 },
      { fullPrice: 9750, value: 30, quantity: 0 },
      { fullPrice: 6500, value: 20, quantity: 0 },
    ],
  },
];
