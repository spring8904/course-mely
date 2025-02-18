import api from '@/configs/api'

export const instructorQuizApi = {
  downloadQuizForm: async () => {
    return await api.get(`$/download-quiz-form`)
  },
}
