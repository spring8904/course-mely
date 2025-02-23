import api from '@/configs/api'

const prefix = 'vnpay-payment'

export const vnPayApi = {
  createVNPayPayment: async (data: { amount: number }) => {
    return await api.post(`${prefix}`, data)
  },
}
