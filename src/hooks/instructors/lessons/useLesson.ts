import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { AxiosResponseError } from '@/types/AxiosResponseError'
import QUERY_KEY from '@/constants/query-key'
import {
  createLesson,
  updateOrderLesson,
} from '@/services/instructor/lesson/lesson-api'

export const useCreateLesson = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createLesson,
    onSuccess: async (res) => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.INSTRUCTOR_COURSE],
      })

      const successMessage = res.data.message || 'Thành công'
      toast.success(successMessage)
    },
    onError: (error: AxiosResponseError) => {
      const errorMessage =
        error?.response?.data?.error || error.message || 'Đã xảy ra lỗi'
      toast.error(errorMessage)
    },
  })
}

export const useUpdateOrderLesson = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      slug,
      lessons,
    }: {
      slug: string
      lessons: { id: number; order: number }[]
    }) => {
      return updateOrderLesson(slug, { lessons })
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.INSTRUCTOR_COURSE],
      })

      const successMessage = 'Cập nhật thứ tự bài học thành công'
      toast.success(successMessage)
    },
    onError: (error: AxiosResponseError) => {
      const errorMessage =
        error?.response?.data?.error || error.message || 'Đã xảy ra lỗi'
      toast.error(errorMessage)
    },
  })
}
