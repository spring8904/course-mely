import { useQuery } from '@tanstack/react-query'

import { ICourseFilter } from '@/types'
import QueryKey from '@/constants/query-key'
import {
  getCourseDetailsBySlug,
  getCourses,
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
