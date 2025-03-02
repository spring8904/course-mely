import api from '@/configs/api'

const prefix = 'instructor/feedbacks'

export const instructorEvaluationApi = {
  getFeedbacks: async (params?: {
    fromDate?: string | undefined
    toDate?: string | undefined
  }) => {
    return await api.get(`${prefix}`, {
      params,
    })
  },
  getFeedBack: async (feedbackId: string) => {
    return await api.get(`${prefix}/feedbacks/${feedbackId}`)
  },
}
