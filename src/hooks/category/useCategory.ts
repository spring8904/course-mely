import { useQuery } from '@tanstack/react-query'

import QueryKey from '@/constants/query-key'
import { categoryApi } from '@/services/category/category-api'

export const useGetCategories = () => {
  return useQuery({
    queryKey: [QueryKey.CATEGORY],
    queryFn: () => categoryApi.getCategories(),
  })
}
