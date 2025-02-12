import { useQuery } from '@tanstack/react-query'

import QUERY_KEY from '@/constants/query-key'
import { categoryApi } from '@/services/category/category-api'

export const useGetCategories = () => {
  return useQuery({
    queryKey: [QUERY_KEY.CATEGORY],
    queryFn: () => categoryApi.getCategories(),
  })
}
