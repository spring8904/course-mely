import api from '@/configs/api'

const prefix = 'instructor/transactions'

export const instructorTransationApi = {
  getParticipatedCourses: async (params?: {
    fromDate?: string | undefined
    toDate?: string | undefined
  }) => {
    return await api.get(`${prefix}/participated-courses`, {
      params,
    })
  },
}
