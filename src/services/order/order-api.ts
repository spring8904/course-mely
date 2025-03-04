import api from '@/configs/api'

const prefix = '/users/orders'

export const orderApi = {
  getOrders: async () => {
    return await api.get(`${prefix}`)
  },
  getOrderDetail: async (id: number) => {
    return await api.get(`${prefix}/${id}`)
  },
}
