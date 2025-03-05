'use client'

import { useRouter } from 'next/navigation'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { IAuthData } from '@/types'
import QueryKey from '@/constants/query-key'
import { authApi } from '@/services/auth/authApi'

export const useSignUp = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  return useMutation({
    mutationFn: (data: IAuthData) => authApi.signUp(data),
    onSuccess: async (res: any) => {
      router.push('/sign-in')
      toast.success(res.message)
      await queryClient.invalidateQueries({ queryKey: [QueryKey.AUTH] })
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })
}
