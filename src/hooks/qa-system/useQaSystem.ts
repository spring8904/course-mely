import { useQuery } from '@tanstack/react-query'

import QUERY_KEY from '@/constants/query-key'
import { qaSystemApi } from '@/services/qa-system/qa-system-api'

export const useGetQaSystems = () => {
  return useQuery({
    queryKey: [QUERY_KEY.QA_SYSTEM],
    queryFn: () => qaSystemApi.getQaSystems(),
  })
}
