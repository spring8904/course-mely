import { useQuery } from '@tanstack/react-query'

import QUERY_KEY from '@/constants/query-key'
import { instructorStatisticApi } from '@/services/instructor/statistic-api'

export const useGetRevenue = () => {
  return useQuery({
    queryKey: [QUERY_KEY.INSTRUCTOR_REVENUE],
    queryFn: instructorStatisticApi.getRevenue,
    staleTime: 1000 * 60 * 5,
  })
}
