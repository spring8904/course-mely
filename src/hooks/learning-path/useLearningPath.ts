import { useQuery } from '@tanstack/react-query'

import QUERY_KEY from '@/constants/query-key'
import { learningPathApi } from '@/services/learning-path/learning-path-api'

export const useGetLessons = (course: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.LEARNING_PATH_LESSON, course],
    queryFn: () => learningPathApi.getLessons(course),
    enabled: !!course,
    staleTime: 1000 * 60 * 5,
  })
}

export const useGetLessonDetail = (course: string, lesson: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.LEARNING_PATH_LESSON, course, lesson],
    queryFn: () => learningPathApi.getLessonDetail(course, lesson),
    enabled: !!course && !!lesson,
  })
}
