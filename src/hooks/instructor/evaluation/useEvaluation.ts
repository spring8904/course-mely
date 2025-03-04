import { useQuery } from '@tanstack/react-query'

import QUERY_KEY from '@/constants/query-key'
import { instructorEvaluationApi } from '@/services/instructor/evaluation/evaluation-api'

export const useGetEvaluations = (filters?: {
  fromDate?: string | undefined
  toDate?: string | undefined
}) => {
  return useQuery({
    queryKey: [QUERY_KEY.EVALUATION, filters],
    queryFn: () => instructorEvaluationApi.getFeedbacks(filters),
  })
}

export const useGetEvaluation = (id: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.EVALUATION, id],
    queryFn: () => instructorEvaluationApi.getFeedBack(id),
    enabled: !!id,
  })
}
