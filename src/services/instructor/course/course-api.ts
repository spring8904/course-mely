import { CreateCoursePayload } from '@/validations/course'
import api from '@/configs/api'

const prefix = '/instructor/manage/courses'

export const getCourses = async () => {
  const { data } = await api.get(prefix)
  return data
}

export const getCourseOverview = async (slug: string) => {
  const { data } = await api.get(`${prefix}/${slug}`)
  return data
}

export const createCourse = (payload: CreateCoursePayload) =>
  api.post(prefix, payload)

export const updateCourse = (data: FormData, slug: string) =>
  api.post(`${prefix}/${slug}`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
