import { useQuery } from '@tanstack/react-query'
import QUERY_KEY from '@/constants/query-key'
import { instructorApi } from '@/services/instructor/get-all/get-all-api'

export const useGetAllInstructor = () => {
  return useQuery({
    queryKey: [QUERY_KEY.INSTRUCTOR_ALL],
    queryFn: () => instructorApi.getAll(),
  })
}
