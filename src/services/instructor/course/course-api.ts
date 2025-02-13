import { CreateCoursePayload } from '@/validations/course'
import api from '@/configs/api'

const prefix = '/instructor/manage/courses'

export const instructorCourseApi = {
  getCourses: async () => {
    return await api.get(prefix)
  },
  getCourseOverview: async (slug: string) => {
    return await api.get(`${prefix}/${slug}`)
  },
  createCourse: (payload: CreateCoursePayload) => {
    return api.post(prefix, payload)
  },
  updateCourse: (data: FormData, slug: string) => {
    return api.post(`${prefix}/${slug}/contentCourse`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },
}
