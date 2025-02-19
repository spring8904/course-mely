import { useQuery } from '@tanstack/react-query'

import QUERY_KEY from '@/constants/query-key'
import { searchApi } from '@/services/search/search-api'

export const useSearch = (query: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.SEARCH, query],
    queryFn: () => searchApi.getDataBySearchQuery(query),
    enabled: !!query.trim() && query.length > 2,
  })
}
