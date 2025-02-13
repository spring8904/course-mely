import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import {
  CreateLessonPayload,
  UpdateTitleLessonPayload,
} from '@/validations/lesson'
import QUERY_KEY from '@/constants/query-key'
import { instructorLessonApi } from '@/services/instructor/lesson/lesson-api'

export const useCreateLesson = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateLessonPayload) =>
      instructorLessonApi.createLesson(data),
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

export const useUpdateContentLesson = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      chapterId,
      id,
      data,
    }: {
      chapterId: number
      id: number
      data: UpdateTitleLessonPayload
    }) => instructorLessonApi.updateContentLesson(chapterId, id, data),
    onSuccess: async (res: any) => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.INSTRUCTOR_COURSE],
      })
      toast.success(res.message)
    },
    onError: (error: any) => {
      toast.error(error.message || 'Có lỗi xảy ra')
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

      toast.success(res.message)
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })
}

export const useDeleteLesson = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ chapterId, id }: { chapterId: number; id: number }) =>
      instructorLessonApi.deleteLesson(chapterId, id),
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
