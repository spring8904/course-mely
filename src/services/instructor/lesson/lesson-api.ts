import { CreateLessonPayload } from '@/validations/lesson'
import api from '@/configs/api'

const prefix = '/instructor/manage/lessons'

export const getLessons = () => api.get(prefix)

export const getLessonOverview = (slug: string) => api.get(`${prefix}/${slug}`)

export const createLesson = (payload: CreateLessonPayload) =>
  api.post(prefix, payload)

export const updateLesson = (slug: string, payload: CreateLessonPayload) =>
  api.put(`${prefix}/${slug}`, payload)

export const updateOrderLesson = async (
  slug: string,
  payload: { lessons: { id: number; order: number }[] }
) => {
  const { data } = await api.put(
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
  return data
}
