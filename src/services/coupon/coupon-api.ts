import api from '@/configs/api'

const prefix = 'coupon'

export const couponApi = {
  getCoupon: async (code: string) => {
    return await api.get(`${prefix}/${code}`)
  },
}
