import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import QUERY_KEY from '@/constants/query-key'
import { instructorProfileApi } from '@/services/instructor/profile/instructor-profile-api'
import { toast } from 'react-toastify'

export const useGetInstructorProfile = (code: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.INSTRUCTOR_PROFILE_INFO, code],
    queryFn: () => instructorProfileApi.getProfile(code),
  })
}

export const useGetInstructorCourses = (code: string, page: number) => {
  return useQuery({
    queryKey: [QUERY_KEY.INSTRUCTOR_PROFILE_COURSE, code, page],
    queryFn: () => instructorProfileApi.getCourses(code, page),
  })
}

export const useCheckInstructorFollow = (code: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.INSTRUCTOR_CHECK_FOLLOW, code],
    queryFn: () => instructorProfileApi.checkFollow(code),
  })
}

export const useFollowInstructor = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ code }: { code: string }) =>
      instructorProfileApi.followInstructor(code),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.INSTRUCTOR_CHECK_FOLLOW],
      })
    },
    onError: (error) => {
      if (error.message) {
        toast.error('Vui lòng đăng nhập trước khi thực hiện!')
      }
    },
  })
}
