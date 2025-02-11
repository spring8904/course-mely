import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { AxiosResponseError } from '@/types/AxiosResponseError'
import { CreateLessonPayload } from '@/validations/lesson'
import QUERY_KEY from '@/constants/query-key'
import { instructorLessonApi } from '@/services/instructor/lesson/lesson-api'

export const useCreateLesson = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateLessonPayload) =>
      instructorLessonApi.createLesson(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.INSTRUCTOR_COURSE],
      })
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
      return instructorLessonApi.updateOrderLesson(slug, { lessons })
    },
    onSuccess: async (res: any) => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.INSTRUCTOR_COURSE],
      })

      const successMessage = 'Cập nhật thứ tự bài học thành công'
      toast.success(res?.message || successMessage)
    },
    onError: (error: AxiosResponseError) => {
      const errorMessage =
        error?.response?.data?.error || error.message || 'Đã xảy ra lỗi'
      toast.error(errorMessage)
    },
  })
}
