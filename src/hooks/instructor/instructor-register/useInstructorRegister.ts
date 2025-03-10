import { instructorRegisterApi } from '@/services/instructor/register/instructor-register-api'
import { useMutation } from '@tanstack/react-query'

export const useInstructorRegister = () => {
  return useMutation({
    mutationFn: instructorRegisterApi.register,
  })
}
