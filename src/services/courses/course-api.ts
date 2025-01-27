import api from '@/configs/api'
import { ICourse } from '@/types'

const prefix = '/courses'

export const getCourseBySlug = async (slug: string): Promise<ICourse> => {
  const response = await api.get(`${prefix}/${slug}`)
  return response.data
}

export const getInstructorsCourseBySlug = async (
  slug: string
): Promise<ICourse> => {
  const response = await api.get(`${prefix}/instructors/${slug}`)
  return response.data
}
