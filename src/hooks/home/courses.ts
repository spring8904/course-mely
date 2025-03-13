import { useQuery } from '@tanstack/react-query'

import QueryKey from '@/constants/query-key'
import { homeCoursesApi } from '@/services/home/courses-api'

export const useGetDiscountedCourses = () => {
  return useQuery({
    queryKey: [QueryKey.COURSES_DISCOUNTED],
    queryFn: homeCoursesApi.getDiscountedCourses,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  })
}

export const useGetFreeCourses = () => {
  return useQuery({
    queryKey: [QueryKey.COURSES_FREE],
    queryFn: async () => await homeCoursesApi.getFreeCourses(),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  })
}
