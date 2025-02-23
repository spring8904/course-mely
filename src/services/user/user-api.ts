import api from '@/configs/api'

const prefix = 'users'

export const userApi = {
  getMyCourses: async () => {
    return await api.get(`${prefix}/my-courses`)
  },
}
