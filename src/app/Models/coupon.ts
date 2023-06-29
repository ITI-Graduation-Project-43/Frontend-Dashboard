export interface Coupon {
  id: number;
  code: string;
  discount: number;
  createdAt: Date;
  expiresAt: Date;
  isDeleted: boolean;
}
