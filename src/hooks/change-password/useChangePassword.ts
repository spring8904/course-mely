import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/stores/useAuthStore'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { ChangePasswordPayload } from '@/validations/change-password'
import QUERY_KEY from '@/constants/query-key'
import { changePasswordApi } from '@/services/change-password/change-password'

export const useChangePassword = () => {
  const queryClient = useQueryClient()
  const { logout } = useAuthStore()
  const router = useRouter()
  return useMutation({
    mutationFn: (data: ChangePasswordPayload) =>
      changePasswordApi.changePassword(data),
    onSuccess: async (res: any) => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.CHANGE_PASSWORD],
      })
      const successMessage = res?.message
      toast.success(successMessage)
      logout()
      router.push('/sign-in')
    },
    onError: (error) => {
      toast.error(error?.message)
    },
  })
}
