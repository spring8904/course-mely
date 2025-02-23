import { useMutation } from '@tanstack/react-query'

import { transationApi } from '@/services/transation/transation-api'

export const useEnrollFreeCourse = () => {
  return useMutation({
    mutationFn: (course_id: string) => {
      transationApi.enrollFreeCourse(course_id)
    },
  })
}
