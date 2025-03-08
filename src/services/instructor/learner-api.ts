import api from '@/configs/api'

const prefix = 'instructor/manage/learners'

export const instructorLearnerApi = {
  getLearners: async () => {
    return await api.get(`${prefix}`)
  },
  getLearnerProcess: async (
    learner: string,
    params?: {
      start_date?: string
      end_date?: string
    }
  ) => {
    return await api.get(`${prefix}/${learner}`, { params })
  },
}
