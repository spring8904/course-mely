import { useQuery } from '@tanstack/react-query'

import QUERY_KEY from '@/constants/query-key'
import { instructorLearnerApi } from '@/services/instructor/learner-api'

export const useGetLearners = () => {
  return useQuery({
    queryKey: [QUERY_KEY.INSTRUCTOR_LEARNER],
    queryFn: () => instructorLearnerApi.getLearners(),
  })
}
