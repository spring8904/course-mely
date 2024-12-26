export interface IInvoice {
  id?: number
  userId?: number
  courseId?: number
  couponCode?: string | null
  couponDiscount?: number | null
  totalCoin: number
  totalCoinDiscount?: number | null
  finalTotal?: number | null
  status: string
  createdAt?: Date | null
  updatedAt?: Date | null
}
