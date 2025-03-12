import { useQuery } from '@tanstack/react-query'
import QUERY_KEY from '@/constants/query-key'
import { instructorProfileApi } from '@/services/instructor/profile/instructor-profile-api'

export const useGetProfileInstructor = (code: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.INSTRUCTOR_PROFILE, code],
    queryFn: () => instructorProfileApi.getProfile(code),
  })
}
