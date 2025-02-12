'use client'

import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/stores/useAuthStore'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import Cookies from 'js-cookie'
import { toast } from 'react-toastify'

import { IAuthData } from '@/types'
import QUERY_KEY from '@/constants/query-key'
import { authApi } from '@/services/auth/authApi'

export const useSignIn = () => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const setUser = useAuthStore((state) => state.setUser)
  const setToken = useAuthStore((state) => state.setToken)

  return useMutation({
    mutationFn: (data: IAuthData) => authApi.signIn(data),
    onSuccess: async (res: any) => {
      const token = res?.token
      const user = res?.user

      const currentToken = Cookies.get('access_token')

      if (token && currentToken !== token) {
        Cookies.remove('access_token')
        Cookies.set('access_token', token, { expires: 7 })
        localStorage.setItem('user', JSON.stringify(user))

        setToken(token)
        setUser(user)
        router.push('/')

        toast.success(res?.message)

        await queryClient.invalidateQueries({ queryKey: [QUERY_KEY.AUTH] })
      } else {
        toast.error('Đăng nhập thất bại, vui lòng thử lại')
      }
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || '')
    },
  })
}
