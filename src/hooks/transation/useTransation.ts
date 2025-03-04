import { useMutation, useQueryClient } from '@tanstack/react-query'

import QUERY_KEY from '@/constants/query-key'
import { transationApi } from '@/services/transation/transation-api'

export const useEnrollFreeCourse = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (courseId: string) => transationApi.enrollFreeCourse(courseId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.USER_GET_MY_COURSES],
      })
    },
  })
}

export const useApplyCoupon = () => {
  return useMutation({
    mutationFn: (data: any) => transationApi.applyCoupon(data),
  })
}
