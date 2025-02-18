import {
  CreateLessonPayload,
  LessonQuizPayload,
  UpdateTitleLessonPayload,
} from '@/validations/lesson'
import api from '@/configs/api'

const prefix = '/instructor/manage/lessons'

export const instructorLessonApi = {
  getLessonOverview: async (slug: string) => {
    return await api.get(`${prefix}/${slug}`)
  },
  createLesson: (payload: CreateLessonPayload) => {
    return api.post(prefix, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },
  createLessonVideo: (chapterId: string, payload: FormData) => {
    return api.post(`${prefix}/${chapterId}/store-lesson-video`, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },
  createLessonDocument: (chapterId: string, payload: FormData) => {
    return api.post(`${prefix}/${chapterId}/store-lesson-document`, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },
  createLessonQuiz: (chapterId: string, payload: LessonQuizPayload) => {
    return api.post(`${prefix}/${chapterId}/store-lesson-quiz`, payload)
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
