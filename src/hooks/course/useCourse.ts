import { useQuery } from '@tanstack/react-query'

import { ICourseFilter } from '@/types'
import QueryKey from '@/constants/query-key'
import {
  getCourseDetailsBySlug,
  getCourses,
  getCoursesOther,
  getCoursesRelated,
} from '@/services/course/course-api'

export const useGetCourseDetails = (slug: string) => {
  return useQuery({
    queryKey: [QueryKey.COURSE, slug],
    queryFn: () => getCourseDetailsBySlug(slug),
  })
}

export const useGetCourses = (dataFilters: ICourseFilter) => {
  return useQuery({
    queryKey: [QueryKey.COURSE, dataFilters],
    queryFn: () => getCourses(dataFilters),
    placeholderData: (previousData) => previousData ?? undefined,
  })
}

export const useGetCoursesRelated = (slug: string) => {
  return useQuery({
    queryKey: [QueryKey.COURSES_RELATED, slug],
    queryFn: () => getCoursesRelated(slug),
  })
}

export const useGetCoursesOther = (slug: string) => {
  return useQuery({
    queryKey: [QueryKey.COURSES_OTHER, slug],
    queryFn: () => getCoursesOther(slug),
  })
}
