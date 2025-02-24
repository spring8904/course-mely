import api from '@/configs/api'

const prefix = 'instructor/transactions'

export const instructorTransationApi = {
  getParticipatedCourses: async () => {
    return await api.get(`${prefix}/participated-courses`)
  },
}
