import { useMutation, useQuery } from '@tanstack/react-query'
import { instructorRegisterApi } from '@/services/instructor/register/instructor-register-api'
import QueryKey from '@/constants/query-key'

export const useInstructorRegister = () => {
  return useMutation({
    mutationFn: instructorRegisterApi.register,
  })
}
