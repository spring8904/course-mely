'use client'

import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/stores/useAuthStore'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'

import { authApi } from '@/services/auth/authApi'

interface ErrorResponse {
  message: string
}

export const useLogOut = () => {
  const router = useRouter()
  const { logout } = useAuthStore()

  return useMutation({
    mutationFn: async () => authApi.logout(),
    onSuccess: async (res: any) => {
      logout()
      router.push('/')
      toast.success(res?.message)
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(
        error?.response?.data?.message || 'Đăng ký thất bại, vui lòng thử lại'
      )
    },
  })
}
