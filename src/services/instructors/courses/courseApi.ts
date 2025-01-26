import api from '@/configs/api'
import { IStoreCourseData } from '@/types'

export const manageCourseApi = {
  storeCourse: async (courseData: IStoreCourseData) => {
    return await api.post('/instructor/courses', courseData)
  },
}
