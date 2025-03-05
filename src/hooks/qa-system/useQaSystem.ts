import { useQuery } from '@tanstack/react-query'

import QueryKey from '@/constants/query-key'
import { qaSystemApi } from '@/services/qa-system/qa-system-api'

export const useGetQaSystems = () => {
  return useQuery({
    queryKey: [QueryKey.QA_SYSTEM],
    queryFn: () => qaSystemApi.getQaSystems(),
  })
}
