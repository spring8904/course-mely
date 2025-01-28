'use client'

import { useRouter } from 'next/navigation'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'

import { IAuthData } from '@/types'
import QUERY_KEY from '@/constants/query-key'
import { authApi } from '@/services/auth/authApi'

import SignUpSuccessToast from '@/sections/signup/_components/signup-success-toast'

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
      await queryClient.invalidateQueries({ queryKey: [QUERY_KEY.AUTH] })
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
