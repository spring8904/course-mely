import { useQuery } from '@tanstack/react-query'

import QUERY_KEY from '@/constants/query-key'
import { learningPathApi } from '@/services/learning-path/learning-path-api'

export const useGetLesson = (course: string, lesson: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.LEARNING_PATH_LESSON, course, lesson],
    queryFn: () => learningPathApi.getLessonInfo(course, lesson),
    enabled: !!course && !!lesson,
  })
}
