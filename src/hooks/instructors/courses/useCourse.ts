import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'

import { IStoreCourseData } from '@/types'
import QUERY_KEY from '@/constants/query-key'
import {
  getCourses,
  storeCourse,
} from '@/services/instructors/courses/course-api'

type ErrorResponse = {
  error: string
}

export const useGetCourses = () => {
  return useQuery({
    queryKey: [QUERY_KEY.INSTRUCTOR_COURSE],
    queryFn: () => getCourses(),
  })
}

export const useStoreCourse = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: IStoreCourseData) => storeCourse(data),
    onSuccess: async (res) => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.INSTRUCTOR_COURSE],
      })

      const successMessage = res.data.message || 'Thành công'
      toast.success(successMessage)
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      const errorMessage =
        error?.response?.data?.error || error.message || 'Đã xảy ra lỗi'
      toast.error(errorMessage)
    },
  })
}
