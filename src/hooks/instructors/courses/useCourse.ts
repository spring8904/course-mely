import { useRouter } from 'next/navigation'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { AxiosResponseError } from '@/types/AxiosResponseError'
import QUERY_KEY from '@/constants/query-key'
import {
  createCourse,
  getCourseOverview,
  getCourses,
  updateCourse,
} from '@/services/instructor/course/course-api'

export const useGetCourses = () => {
  return useQuery({
    queryKey: [QUERY_KEY.INSTRUCTOR_COURSE],
    queryFn: getCourses,
  })
}

export const useGetCourseOverview = (slug?: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.INSTRUCTOR_COURSE, slug],
    queryFn: () => getCourseOverview(slug!),
    enabled: !!slug,
  })
}

export const useCreateCourse = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  return useMutation({
    mutationFn: createCourse,
    onSuccess: async ({ data }: any) => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.INSTRUCTOR_COURSE],
      })

      console.log('data', data)
      const courseSlug = data?.slug

      console.log('courseSlug', courseSlug)

      if (courseSlug) {
        toast.success(data?.message ?? 'Thành công')
        router.push(`/instructor/courses/update/${courseSlug}`)
      }
    },
    onError: (error: AxiosResponseError) => {
      const errorMessage =
        error?.response?.data?.error || error.message || 'Đã xảy ra lỗi'
      toast.error(errorMessage)
    },
  })
}

export const useUpdateCourse = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ data, slug }: { data: any; slug: string }) => {
      const formData = new FormData()
      formData.append('_method', 'PUT')

      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, value instanceof Blob ? value : String(value))
        }
      })

      return updateCourse(formData, slug)
    },
    onSuccess: async (res) => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.INSTRUCTOR_COURSE],
      })
      console.log(res)
      const successMessage = res?.data?.message ?? 'Thành công'
      toast.success(successMessage)
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message ?? 'Đã xảy ra lỗi'
      toast.error(errorMessage)
    },
  })
}
