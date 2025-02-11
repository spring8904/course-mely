import { useRouter } from 'next/navigation'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { ICourse } from '@/types'
import { AxiosResponseError } from '@/types/AxiosResponseError'
import { CreateCoursePayload } from '@/validations/course'
import QUERY_KEY from '@/constants/query-key'
import { instructorCourseApi } from '@/services/instructor/course/course-api'

export const useGetCourses = () => {
  return useQuery({
    queryKey: [QUERY_KEY.INSTRUCTOR_COURSE],
    queryFn: () => instructorCourseApi.getCourses(),
  })
}

export const useGetCourseOverview = (slug?: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.INSTRUCTOR_COURSE, slug],
    queryFn: () => instructorCourseApi.getCourseOverview(slug!),
    enabled: !!slug,
  })
}

export const useCreateCourse = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  return useMutation({
    mutationFn: (data: CreateCoursePayload) =>
      instructorCourseApi.createCourse(data),
    onSuccess: async (res: any) => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.INSTRUCTOR_COURSE],
      })

      const courseSlug = res?.data?.slug

      if (courseSlug) {
        router.push(`/instructor/courses/update/${courseSlug}`)
      }
    },
    onError: (error: any) => {
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
      return instructorCourseApi.updateCourse(formData, slug)
    },
    onSuccess: async (res) => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.INSTRUCTOR_COURSE],
      })

      const successMessage = res?.data?.message ?? 'Thành công'
      toast.success(successMessage)
    },
    onError: (error: AxiosResponseError) => {
      const errorMessage =
        error?.response?.data?.error ?? error?.message ?? 'Đã xảy ra lỗi'
      toast.error(errorMessage)
    },
  })
}
