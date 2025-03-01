import { useQuery } from '@tanstack/react-query'

import QUERY_KEY from '@/constants/query-key'
import { userApi } from '@/services/user/user-api'

export const useGetMyCourses = () => {
  return useQuery({
    queryFn: () => userApi.getMyCourses(),
    queryKey: [QUERY_KEY.USER_GET_MY_COURSES],
  })
}

export const useGetProgress = (course: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.COURSE_PROGRESS, course],
    queryFn: () => userApi.getProgress(course),
    enabled: !!course,
    staleTime: 1000 * 60 * 5,
  })
}

export const useGetCouponUser = () => {
  return useQuery({
    queryKey: [QUERY_KEY.USER_GET_MY_COUPONS],
    queryFn: () => userApi.getCouponUser(),
  })
}
