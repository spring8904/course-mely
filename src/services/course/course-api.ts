import { ICourse } from '@/types'
import api from '@/configs/api'

const prefix = '/courses'

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
