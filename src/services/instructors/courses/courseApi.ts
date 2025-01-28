import { IStoreCourseData } from '@/types'
import api from '@/configs/api'

export const manageCourseApi = {
  storeCourse: async (courseData: IStoreCourseData) => {
    return await api.post('/instructor/courses', courseData)
  },
}
