import { StoreQuestionPayload } from '@/validations/lesson'
import api from '@/configs/api'

const prefix = 'instructor/manage/lessons/quiz'

export const instructorQuizApi = {
  downloadQuizForm: async () => {
    return await api.get(`${prefix}/download-quiz-form`)
  },
  getQuiz: async (quizId: string) => {
    return await api.get(`${prefix}/${quizId}/show-quiz`)
  },
  getQuestion: async (questionId: string) => {
    return await api.get(`${prefix}/${questionId}/show-quiz-question`)
  },
  createQuestion: (quizId: string, payload: StoreQuestionPayload) => {
    return api.post(`${prefix}/${quizId}/store-quiz-question-single`, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },
  importQuestion: (quizId: string, payload: FormData) => {
    return api.post(`${prefix}/${quizId}/import-quiz-question`, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },
  updateQuestion: async (questionId: string, data: StoreQuestionPayload) => {
    return await api.put(`${prefix}/${questionId}/update-quiz-question`, data)
  },
  deleteQuestion: async (questionId: string) => {
    return await api.delete(`${prefix}/${questionId}/delete-quiz-question`)
  },
}
