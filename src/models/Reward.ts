export interface RedeemableOption {
  fullPrice: number;
  discountedPrice?: number;
  value: number;
}

export interface Reward {
  name: string;
  options: RedeemableOption[];
}
