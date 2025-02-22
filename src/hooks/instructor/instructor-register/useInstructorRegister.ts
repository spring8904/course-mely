import { useRouter } from 'next/navigation'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { RegisterInstructorInput } from '@/validations/instructor'
import QUERY_KEY from '@/constants/query-key'
import { instructorRegisterApi } from '@/services/instructor/register/instructor-register-api'

export const useInstructorRegister = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  return useMutation({
    mutationFn: (data: RegisterInstructorInput) =>
      instructorRegisterApi.register(data),
    onSuccess: async (res: any) => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.AUTH],
      })

      router.push('/')

      toast.success(res.message)
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })
}
