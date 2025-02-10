import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'

import { ICourse, IStoreCourseData } from '@/types'
import QUERY_KEY from '@/constants/query-key'
import {
  getCourseOverview,
  getCourses,
  storeCourse,
  updateCourse,
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

export const useGetCourseOverview = (slug?: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.INSTRUCTOR_COURSE, slug],
    queryFn: () => getCourseOverview(slug!),
    enabled: !!slug,
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

export const useUpdateCourse = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ data, slug }: { data: ICourse; slug: string }) => {
      const formData = new FormData()
      formData.append('_method', 'PUT')
      formData.append('name', data.name)
      formData.append('code', data.code)
      formData.append('status', data.status)
      return updateCourse(formData, slug)
    },
    onSuccess: async (res) => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.INSTRUCTOR_COURSE],
      })

      const successMessage = res?.data?.message ?? 'Thành công'
      toast.success(successMessage)
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      const errorMessage =
        error?.response?.data?.error ?? error?.message ?? 'Đã xảy ra lỗi'
      toast.error(errorMessage)
    },
  })
}
