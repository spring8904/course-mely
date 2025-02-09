import { IStoreCourseData } from '@/types'
import api from '@/configs/api'

const prefix = '/instructor/manage/courses'

export const getCourses = () => api.get(prefix)

export const getCourseOverview = (slug: string) => api.get(`${prefix}/${slug}`)

export const storeCourse = (data: IStoreCourseData) => api.post(prefix, data)
