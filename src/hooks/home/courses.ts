import { useQuery } from '@tanstack/react-query'

import QUERY_KEY from '@/constants/query-key'
import { homeCoursesApi } from '@/services/home/courses-api'

export const useGetDiscountedCourses = () => {
  return useQuery({
    queryKey: [QUERY_KEY.COURSES_DISCOUNTED],
    queryFn: homeCoursesApi.getDiscountedCourses,
  })
}

export const useGetFreeCourses = () => {
  return useQuery({
    queryKey: [QUERY_KEY.COURSES_FREE],
    queryFn: async () => await homeCoursesApi.getFreeCourses(),
  })
}
