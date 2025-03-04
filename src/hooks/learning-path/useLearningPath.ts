import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import QUERY_KEY from '@/constants/query-key'
import { learningPathApi } from '@/services/learning-path/learning-path-api'

export const useGetLessons = (course: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.LEARNING_PATH_LESSON, course],
    queryFn: () => learningPathApi.getLessons(course),
  })
}

export const useGetChapterFromLesson = (lessonId: number) => {
  return useQuery({
    queryKey: [QUERY_KEY.NOTE_LESSON, lessonId],
    queryFn: () => learningPathApi.getChapterFromLesson(lessonId),
  })
}

export const useGetLessonDetail = (course: string, lesson: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.LEARNING_PATH_LESSON, course, lesson],
    queryFn: () => learningPathApi.getLessonDetail(course, lesson),
  })
}

export const useGetQuizSubmission = (
  lessonId: number,
  quizId: number,
  isCompleted: boolean
) => {
  return useQuery({
    queryKey: [QUERY_KEY.QUIZ_SUBMISSION, lessonId, quizId],
    queryFn: () => learningPathApi.getQuizSubmission(lessonId, quizId),
    enabled: isCompleted,
  })
}

export const useGetCodeSubmission = (
  lessonId: number,
  codingId: number,
  isCompleted: boolean
) => {
  return useQuery({
    queryKey: [QUERY_KEY.CODING_SUBMISSION, lessonId, codingId],
    queryFn: () => learningPathApi.getCodeSubmission(lessonId, codingId),
    enabled: isCompleted,
  })
}

export const useCompleteLesson = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: learningPathApi.completeLesson,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.LEARNING_PATH_LESSON],
      })
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.COURSE_PROGRESS],
      })
    },
  })
}

export const useUpdateLastTime = () => {
  return useMutation({
    mutationFn: learningPathApi.updateLastTime,
  })
}
