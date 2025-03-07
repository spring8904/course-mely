import api from '@/configs/api'

export const instructorApi = {
  getAll: async () => {
    return await api.get('/instructor-order-by-count-course')
  },
}
