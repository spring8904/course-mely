import { useQuery } from '@tanstack/react-query'

import QueryKey from '@/constants/query-key'
import { instructorEvaluationApi } from '@/services/instructor/evaluation/evaluation-api'

export const useGetEvaluations = (filters?: {
  fromDate?: string | undefined
  toDate?: string | undefined
}) => {
  return useQuery({
    queryKey: [QueryKey.EVALUATION, filters],
    queryFn: () => instructorEvaluationApi.getFeedbacks(filters),
  })
}

export const useGetEvaluation = (id: string) => {
  return useQuery({
    queryKey: [QueryKey.EVALUATION, id],
    queryFn: () => instructorEvaluationApi.getFeedBack(id),
    enabled: !!id,
  })
}
