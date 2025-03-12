import { useQuery } from '@tanstack/react-query'

import QueryKey from '@/constants/query-key'
import { categoryApi } from '@/services/category/category-api'

export const useGetCategories = () => {
  return useQuery({
    queryKey: [QueryKey.CATEGORY],
    queryFn: () => categoryApi.getCategories(),
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  })
}
