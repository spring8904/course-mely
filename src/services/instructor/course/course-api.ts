import { CreateCoursePayload } from '@/validations/course'
import api from '@/configs/api'

const prefix = '/instructor/manage/courses'

export const getCourses = () => api.get(prefix)

export const getCourseOverview = (slug: string) => api.get(`${prefix}/${slug}`)

export const createCourse = (payload: CreateCoursePayload) =>
  api.post(prefix, payload)

export const updateCourse = (data: FormData, slug: string) =>
  api.post(`${prefix}/${slug}`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
