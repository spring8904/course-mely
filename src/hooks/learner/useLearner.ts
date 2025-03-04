import { useQuery } from '@tanstack/react-query'

import QueryKey from '@/constants/query-key'
import { instructorLearnerApi } from '@/services/instructor/learner-api'

export const useGetLearners = () => {
  return useQuery({
    queryKey: [QueryKey.INSTRUCTOR_LEARNER],
    queryFn: () => instructorLearnerApi.getLearners(),
  })
}
