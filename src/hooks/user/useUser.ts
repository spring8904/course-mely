import { useQuery } from '@tanstack/react-query'

import QUERY_KEY from '@/constants/query-key'
import { userApi } from '@/services/user/user-api'

export const useGetMyCourses = () => {
  return useQuery({
    queryFn: () => userApi.getMyCourses(),
    queryKey: [QUERY_KEY.USER_GET_MY_COURSES],
  })
}
