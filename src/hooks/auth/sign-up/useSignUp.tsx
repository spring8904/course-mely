'use client'

import SignUpSuccessToast from '@/sections/signup/_components/signup-success-toast'
import { authApi } from '@/services/auth/authApi'
import { IAuthData } from '@/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

interface ErrorResponse {
  message: string
}

export const useSignUp = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  return useMutation({
    mutationFn: (data: IAuthData) => authApi.signUp(data),
    onSuccess: async () => {
      toast.success(
        <SignUpSuccessToast navigateToLogin={() => router.push('/sign-in')} />
      )
      await queryClient.invalidateQueries({ queryKey: ['auth'] })
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(
        <div className="text-xl font-semibold text-red-600">
          {error?.response?.data?.message}
        </div>
      )
    },
  })
}
