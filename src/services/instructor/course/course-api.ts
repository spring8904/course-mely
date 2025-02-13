import { CreateCoursePayload } from '@/validations/course'
import api from '@/configs/api'

const prefix = '/instructor/manage/courses'

export const getCourses = async () => {
  const { data } = await api.get(prefix)
  return data
}

export const getCourseOverview = async (slug: string) => {
  return await api.get(`${prefix}/${slug}`)
}

export const createCourse = (payload: CreateCoursePayload) =>
  api.post(prefix, payload)

export const updateCourse = (data: FormData, slug: string) =>
  api.post(`${prefix}/${slug}/contentCourse`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
