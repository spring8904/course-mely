import { useQuery } from '@tanstack/react-query'

import QUERY_KEY from '@/constants/query-key'
import { instructorTransationApi } from '@/services/instructor/transaction/instructor-transaction-api'

export const useGetParticipatedCourses = (filters?: {
  fromDate?: string | undefined
  toDate?: string | undefined
}) => {
  return useQuery({
    queryKey: [QUERY_KEY.INSTRUCTOR_GET_PARTICIPATED_COURSE, filters],
    queryFn: () => instructorTransationApi.getParticipatedCourses(filters),
    keepPreviousData: true,
  })
}
