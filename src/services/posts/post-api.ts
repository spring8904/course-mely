import api from '@/configs/api'
import { IPost } from '@/types'

const prefix = '/posts'

export const getPostBySlug = async (slug: string): Promise<IPost> => {
  const response = await api.get(`${prefix}/${slug}`)
  return response.data
}
