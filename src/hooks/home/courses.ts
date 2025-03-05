import { useQuery } from '@tanstack/react-query'

import QueryKey from '@/constants/query-key'
import { homeCoursesApi } from '@/services/home/courses-api'

export const useGetDiscountedCourses = () => {
  return useQuery({
    queryKey: [QueryKey.COURSES_DISCOUNTED],
    queryFn: homeCoursesApi.getDiscountedCourses,
  })
}

export const useGetFreeCourses = () => {
  return useQuery({
    queryKey: [QueryKey.COURSES_FREE],
    queryFn: async () => await homeCoursesApi.getFreeCourses(),
  })
}
