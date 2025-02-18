import {
  CreateCoursePayload,
  UpdateCourseObjectivePayload,
} from '@/validations/course'
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
  updateCourseOverView: (slug: string, data: FormData) => {
    return api.post(`${prefix}/${slug}/courseOverView`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },
  updateCourseObjective: (
    slug: string,
    payload: UpdateCourseObjectivePayload
  ) => {
    return api.put(`${prefix}/${slug}/courseObjective`, payload)
  },
  downloadQuizForm: async () => {
    return await api.get(`/download-quiz-form`, {
      responseType: 'blob',
    })
  },
}
