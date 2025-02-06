'use client'

import { useRouter } from 'next/navigation'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'

import { IAuthData } from '@/types'
import QUERY_KEY from '@/constants/query-key'
import { authApi } from '@/services/auth/authApi'

import SignInSuccessToast from '@/sections/signin/_components/signin-success-toast'

interface ErrorResponse {
  message: string
}

export const useSignIn = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  return useMutation({
    mutationFn: (data: IAuthData) => authApi.signIn(data),
    onSuccess: async () => {
      toast.success(
        <SignInSuccessToast navigateToLogin={() => router.push('/')} />
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
