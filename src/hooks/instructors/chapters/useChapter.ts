import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { AxiosResponseError } from '@/types/AxiosResponseError'
import QUERY_KEY from '@/constants/query-key'
import { createChapter } from '@/services/instructor/chapter/chapter-api'

export const useCreateChapter = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createChapter,
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
