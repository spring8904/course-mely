export enum DiscountType {
  Percentage = 'percentage',
  Fixed = 'fixed',
}

export interface ICoupon {
  id?: number
  userId?: number
  name: string
  code: string
  description?: string | null
  discountType?: DiscountType
  discountValue: number
  startTime: Date
  endTime: Date
  usedCount: number
  status?: 0 | 1
  deletedAt?: Date | null
  createdAt?: Date | null
  updatedAt?: Date | null
}

export enum CouponUseStatus {
  Used = 'used',
  Unused = 'unused',
}

export interface ICouponUse {
  id?: number
  userId?: number
  couponId?: number
  status?: CouponUseStatus
  appliedAt?: Date | null
  expiresAt?: Date | null
  createdAt?: Date | null
  updatedAt?: Date | null
}
