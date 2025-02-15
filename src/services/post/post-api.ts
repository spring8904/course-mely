import { CreatePostPayload } from '@/validations/post'
import api from '@/configs/api'

const prefix = '/posts'

export const postApi = {
  getPosts: async () => {
    return await api.get(prefix)
  },
  createPost: (payload: CreatePostPayload) => {
    return api.post(prefix, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },
}
