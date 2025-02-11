import { CreateLessonPayload } from '@/validations/lesson'
import api from '@/configs/api'

const prefix = '/instructor/manage/lessons'

export const instructorLessonApi = {
  getLessonOverview: async (slug: string) => {
    return await api.get(`${prefix}/${slug}`)
  },
  createLesson: (payload: CreateLessonPayload) => {
    return api.post(prefix, payload)
  },
  updateLesson: (slug: string, payload: CreateLessonPayload) => {
    return api.put(`${prefix}/${slug}`, payload)
  },
  updateOrderLesson: async (
    slug: string,
    payload: { lessons: { id: number; order: number }[] }
  ) => {
    return await api.put(
      `${prefix}/${slug}/update-order`,
      {
        lessons: payload.lessons,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  },
}
