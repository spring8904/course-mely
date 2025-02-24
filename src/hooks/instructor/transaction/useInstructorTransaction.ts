import { useQuery } from '@tanstack/react-query'

import QUERY_KEY from '@/constants/query-key'
import { instructorTransationApi } from '@/services/instructor/transaction/instructor-transaction-api'

export const useGetParticipatedCourses = () => {
  return useQuery({
    queryKey: [QUERY_KEY.INSTRUCTOR_GET_PARTICIPATED_COURSE],
    queryFn: () => instructorTransationApi.getParticipatedCourses(),
  })
}
