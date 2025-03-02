import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import QUERY_KEY from '@/constants/query-key'
import { instructorRegisterApi } from '@/services/instructor/register/instructor-register-api'

export const useInstructorRegister = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: instructorRegisterApi.register,
    onSuccess: async (res: any) => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.AUTH],
      })
      toast.success(res.message)
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })
}
