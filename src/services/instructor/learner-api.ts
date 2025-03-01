import api from '@/configs/api'

const prefix = 'instructor/manage/learners'

export const instructorLearnerApi = {
  getLearners: async () => {
    return await api.get(`${prefix}`)
  },
}
