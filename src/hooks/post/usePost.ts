import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { format } from 'date-fns'
import { toast } from 'react-toastify'

import { CreatePostPayload } from '@/validations/post'
import QUERY_KEY from '@/constants/query-key'
import { postApi } from '@/services/post/post-api'

export const useGetPosts = () => {
  return useQuery({
    queryKey: [QUERY_KEY.POSTS],
    queryFn: () => postApi.getPosts(),
  })
}

export const useCreatePost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreatePostPayload) => {
      console.log(data)
      const formData = new FormData()

      Object.entries(data).forEach(([key, value]: [string, any]) => {
        if (value !== undefined && value !== null) {
          if (value instanceof File || value instanceof Blob) {
            formData.append(key, value)
          } else if (Array.isArray(value)) {
            value.forEach((v) => formData.append(`${key}[]`, String(v)))
          } else if (typeof value === 'object') {
            if (value instanceof Date) {
              formData.append(key, format(value, 'yyyy-MM-dd HH:mm:ss'))
            } else {
              formData.append(key, JSON.stringify(value))
            }
          } else if (key === 'published_at') {
            formData.append(key, format(new Date(value), 'yyyy-MM-dd HH:mm:ss'))
          } else {
            formData.append(key, String(value))
          }
        }
      })

      return postApi.createPost(formData as any)
    },
    onSuccess: async (res: any) => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.POSTS],
      })

      toast.success(res?.message || 'Bài viết đã được tạo thành công!')
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })
}
