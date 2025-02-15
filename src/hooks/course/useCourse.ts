import { useQuery } from '@tanstack/react-query'

import QUERY_KEY from '@/constants/query-key'
import { getCourseDetailsBySlug } from '@/services/course/course-api'

export const useGetCourseDetails = (slug: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.COURSE, slug],
    queryFn: () => getCourseDetailsBySlug(slug),
  })
}
