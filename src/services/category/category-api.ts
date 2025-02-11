import api from '@/configs/api'

const prefix = '/categories'

export const categoryApi = {
  getCategories: async () => {
    return await api.get(`${prefix}`)
  },
}
