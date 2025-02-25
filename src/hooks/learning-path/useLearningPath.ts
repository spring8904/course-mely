import { useQuery } from '@tanstack/react-query'

import QUERY_KEY from '@/constants/query-key'
import { learningPathApi } from '@/services/learning-path/learning-path-api'
import { userApi } from '@/services/user/user-api'

export const useGetLessons = (course: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.LEARNING_PATH_LESSON, course],
    queryFn: () => learningPathApi.getLessons(course),
    enabled: !!course,
  })
}

export const useGetLessonDetail = (course: string, lesson: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.LEARNING_PATH_LESSON, course, lesson],
    queryFn: () => learningPathApi.getLessonDetail(course, lesson),
    enabled: !!course && !!lesson,
  })
}

export const useGetProgress = (course: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.LEARNING_PATH_PROGRESS, course],
    queryFn: () => userApi.getProgress(course),
    enabled: !!course,
  })
}
