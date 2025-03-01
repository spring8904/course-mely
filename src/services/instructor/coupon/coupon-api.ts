import { CouponPayload } from '@/validations/coupon'
import api from '@/configs/api'

const prefix = 'instructor/coupons'

export const instructorCouponApi = {
  getCoupons: async (params?: {
    fromDate?: string | undefined
    toDate?: string | undefined
  }) => {
    return await api.get(`${prefix}`, {
      params,
    })
  },
  getCoupon: async (id: string) => {
    return await api.get(`${prefix}/${id}`)
  },
  createCoupon: async (data: CouponPayload) => {
    return await api.post(`${prefix}`, data)
  },
  updateCoupon: async (id: string, data: CouponPayload) => {
    return await api.put(`${prefix}/${id}`, data)
  },
  toggleStatus: async (id: string, action: string) => {
    return await api.put(`${prefix}/${id}/${action}`)
  },
}
