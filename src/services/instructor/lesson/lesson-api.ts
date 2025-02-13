import {
  CreateLessonPayload,
  UpdateTitleLessonPayload,
} from '@/validations/lesson'
import api from '@/configs/api'

const prefix = '/instructor/manage/lessons'

export const instructorLessonApi = {
  getLessonOverview: async (slug: string) => {
    return await api.get(`${prefix}/${slug}`)
  },
  createLesson: (payload: CreateLessonPayload) => {
    return api.post(prefix, payload)
  },
  updateContentLesson: (
    chapterId: number,
    id: number,
    payload: UpdateTitleLessonPayload
  ) => {
    return api.put(`${prefix}/${chapterId}/${id}`, payload)
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
  deleteLesson: (chapterId: number, id: number) => {
    return api.delete(`${prefix}/${chapterId}/${id}`)
  },
}
