import api from '@/configs/api'
import { IInstructorCourseResponse, IInstructorProfileResponse } from '@/types'

export const instructorProfileApi = {
  getProfile: async (code: string): Promise<IInstructorProfileResponse> => {
    return await api.get(`instructor-info/${code}`)
  },
  getCourses: async (
    code: string,
    page: number
  ): Promise<IInstructorCourseResponse> => {
    return await api.get(`get-course-instructor/${code}?${page}`)
  },
}
