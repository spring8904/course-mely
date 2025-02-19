import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import {
  CreateLessonPayload,
  LessonCodingPayload,
  LessonQuizPayload,
  StoreQuestionPayload,
  UpdateTitleLessonPayload,
} from '@/validations/lesson'
import QUERY_KEY from '@/constants/query-key'
import { instructorLessonApi } from '@/services/instructor/lesson/lesson-api'

export const useGetLessonCoding = (lessonId: string, coding: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.INSTRUCTOR_LESSON_CODING],
    queryFn: () => instructorLessonApi.getLessonCoding(lessonId, coding),
    enabled: !!coding,
  })
}

export const useCreateLessonVideo = () => {
  return useMutation({
    mutationFn: ({
      chapterId,
      payload,
    }: {
      chapterId: string
      payload: FormData
    }) => instructorLessonApi.createLessonVideo(chapterId, payload),
  })
}

export const useCreateLessonDocument = () => {
  return useMutation({
    mutationFn: ({
      chapterId,
      payload,
    }: {
      chapterId: string
      payload: FormData
    }) => instructorLessonApi.createLessonDocument(chapterId, payload),
  })
}

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

export const useCreateLessonCoding = () => {
  return useMutation({
    mutationFn: ({
      chapterId,
      payload,
    }: {
      chapterId: string
      payload: LessonCodingPayload
    }) => instructorLessonApi.createLessonCoding(chapterId, payload),
  })
}

export const useCreateLessonQuiz = () => {
  return useMutation({
    mutationFn: ({
      chapterId,
      payload,
    }: {
      chapterId: string
      payload: LessonQuizPayload
    }) => instructorLessonApi.createLessonQuiz(chapterId, payload),
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
