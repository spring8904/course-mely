import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import QUERY_KEY from '@/constants/query-key'
import { learningPathApi } from '@/services/learning-path/learning-path-api'
import { CompleteLessonPayload } from '@/types/LearningPath'

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
  isCompleted: boolean,
  lessonId?: number,
  quizId?: number
) => {
  return useQuery({
    queryKey: [QUERY_KEY.QUIZ_SUBMISSION, lessonId, quizId],
    queryFn: () => learningPathApi.getQuizSubmission(lessonId!, quizId!),
    enabled: isCompleted && !!lessonId && !!quizId,
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

export const useCompleteLesson = (lessonId: number) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: CompleteLessonPayload) => {
      if (lessonId === undefined)
        return Promise.reject(new Error('Lesson ID is required'))
      return learningPathApi.completeLesson(lessonId, payload)
    },
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
