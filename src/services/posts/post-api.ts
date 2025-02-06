import { IPost } from '@/types'
import api from '@/configs/api'

const prefix = '/posts'

export const getPostBySlug = async (slug: string): Promise<IPost> => {
  const response = await api.get(`${prefix}/${slug}`)
  return response.data
}
