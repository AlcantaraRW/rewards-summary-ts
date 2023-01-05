export interface RedeemableOption {
  fullPrice: number;
  discountedPrice?: number;
  value: number;
  quantity: number;
}

export interface Reward {
  name: string;
  options: RedeemableOption[];
}
