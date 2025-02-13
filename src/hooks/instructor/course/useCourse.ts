import { useRouter } from 'next/navigation'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { CreateCoursePayload, UpdateCoursePayload } from '@/validations/course'
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

      const courseSlug = res?.slug

      if (courseSlug) {
        router.push(`/instructor/courses/update/${courseSlug}`)
      }
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })
}

export const useUpdateCourse = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      data,
      slug,
    }: {
      data: UpdateCoursePayload
      slug: string
    }) => {
      const formData = new FormData()
      formData.append('_method', 'PUT')

      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, value instanceof Blob ? value : String(value))
        }
      })

      return instructorCourseApi.updateCourse(formData, slug)
    },
    onSuccess: async (res: any) => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.INSTRUCTOR_COURSE],
      })

      toast.success(res.message)
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })
}
