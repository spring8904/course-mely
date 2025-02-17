import { useRouter } from 'next/navigation'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import {
  CreateCoursePayload,
  UpdateCourseObjectivePayload,
  UpdateCourseOverViewPayload,
} from '@/validations/course'
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

      const courseSlug = res?.data.slug
      const successMessage = res?.message || 'Khóa học đã được tạo thành công!'

      if (courseSlug) {
        await router.push(`/instructor/courses/update/${courseSlug}`)

        toast.success(successMessage)
      }
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })
}

export const useUpdateCourseObjective = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      slug,
      data,
    }: {
      slug: string
      data: UpdateCourseObjectivePayload
    }) => instructorCourseApi.updateCourseObjective(slug, data),
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

export const useUpdateCourseOverView = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      slug,
      data,
    }: {
      slug: string
      data: UpdateCourseOverViewPayload
    }) => {
      const formData = new FormData()
      formData.append('_method', 'PUT')

      const appendFormData = (
        formData: FormData,
        data: Record<string, any>
      ) => {
        Object.entries(data).forEach(([key, value]) => {
          if (value === undefined || value === null) return

          if (value instanceof File) {
            formData.append(key, value)
          } else if (Array.isArray(value)) {
            value.forEach((item, index) => {
              appendFormData(formData, { [`${key}[${index}]`]: item })
            })
          } else if (typeof value === 'object' && !(value instanceof File)) {
            appendFormData(formData, value)
          } else {
            formData.append(key, String(value))
          }
        })
      }

      if (data.thumbnail instanceof File) {
        formData.append('thumbnail', data.thumbnail)
      }
      if (data.intro instanceof File) {
        formData.append('intro', data.intro)
      }

      formData.append('is_free', data.is_free === '1' ? '1' : '0')

      if (data.is_free === '1') {
        formData.append('price', '0')
        formData.append('price_sale', '0')
      } else {
        if (data.price !== undefined) {
          formData.append('price', String(data.price))
        }
        if (data.price_sale !== undefined) {
          formData.append('price_sale', String(data.price_sale))
        }
      }

      appendFormData(formData, {
        category_id: data.category_id,
        name: data.name,
        description: data.description,
        level: data.level,
        visibility: data.visibility,
      })

      return instructorCourseApi.updateCourseOverView(slug, formData)
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
