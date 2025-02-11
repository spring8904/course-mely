'use client'

import { useRouter } from 'next/navigation'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { IAuthData } from '@/types'
import QUERY_KEY from '@/constants/query-key'
import { authApi } from '@/services/auth/authApi'

export const useSignUp = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  return useMutation({
    mutationFn: (data: IAuthData) => authApi.signUp(data),
    onSuccess: async () => {
      router.push('/sign-in')
      await queryClient.invalidateQueries({ queryKey: [QUERY_KEY.AUTH] })
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message)
    },
  })
}
