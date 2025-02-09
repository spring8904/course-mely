import { IStoreCourseData } from '@/types'
import api from '@/configs/api'

const prefix = '/instructor/manage/courses'

export const getCourses = async () => {
  const response = await api.get(prefix)
  return response
}

export const storeCourse = async (data: IStoreCourseData) => {
  const response = await api.post(prefix, data)
  return response
}
