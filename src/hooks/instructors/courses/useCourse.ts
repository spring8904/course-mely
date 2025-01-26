import { useMutation, useQueryClient } from '@tanstack/react-query'
import { IStoreCourseData } from '@/types'
import { manageCourseApi } from '@/services/instructors/courses/courseApi'
import QUERY_KEY from '@/constants/query-key'

export const useStoreCourse = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: IStoreCourseData) => manageCourseApi.storeCourse(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.INSTRUCTOR_COURSE],
      })
    },
  })
}
