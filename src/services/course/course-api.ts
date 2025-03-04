import { ICourse, ICourseDataResponse, ICourseFilter } from '@/types'
import api from '@/configs/api'

const prefix = 'courses'

export const getCourseBySlug = async (slug: string): Promise<ICourse> => {
  const response = await api.get(`instructor/manage/${prefix}/${slug}`)
  return response.data
}

export const getInstructorsCourseBySlug = async (
  slug: string
): Promise<ICourse> => {
  const response = await api.get(`${prefix}/instructors/${slug}`)
  return response.data
}

export const getCourseDetailsBySlug = async (
  slug: string
): Promise<ICourse> => {
  const { data } = await api.get(`${prefix}/${slug}`)
  return data
}

export const getCourses = async (
  dataFilters: ICourseFilter
): Promise<ICourseDataResponse> => {
  const { data } = await api.get('/filters', {
    params: dataFilters,
  })
  return data
}
