import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { CreateChapterPayload } from '@/validations/chapter'
import QUERY_KEY from '@/constants/query-key'
import { instructorChapterApi } from '@/services/instructor/chapter/chapter-api'

export const useCreateChapter = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateChapterPayload) =>
      instructorChapterApi.createChapter(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.INSTRUCTOR_COURSE],
      })
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.error || error.message || 'Đã xảy ra lỗi'
      toast.error(errorMessage)
    },
  })
}
