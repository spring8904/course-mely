import { useQuery } from '@tanstack/react-query'

import QUERY_KEY from '@/constants/query-key'
import { instructorStatisticApi } from '@/services/instructor/statistics-api'

export const useGetOverviewStatistics = () => {
  return useQuery({
    queryKey: [QUERY_KEY.INSTRUCTOR_STATISTICS_OVERVIEW],
    queryFn: instructorStatisticApi.getOverviewStatistics,
  })
}

export const useGetRevenueStatistics = (year: number) => {
  return useQuery({
    queryKey: [QUERY_KEY.INSTRUCTOR_STATISTICS_REVENUE, year],
    queryFn: () => instructorStatisticApi.getRevenueStatistics(year),
    enabled: year > 0,
  })
}
