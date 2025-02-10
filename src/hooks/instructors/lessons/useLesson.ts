import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { AxiosResponseError } from '@/types/AxiosResponseError'
import QUERY_KEY from '@/constants/query-key'
import { createLesson } from '@/services/instructor/lesson/lesson-api'

export const useCreateLesson = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createLesson,
    onSuccess: async (res) => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.INSTRUCTOR_LESSON],
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
