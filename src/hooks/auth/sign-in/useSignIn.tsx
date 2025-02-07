'use client'

import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/stores/useAuthStore'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import Cookies from 'js-cookie'
import { toast } from 'react-toastify'

import { IAuthData } from '@/types'
import QUERY_KEY from '@/constants/query-key'
import { authApi } from '@/services/auth/authApi'

import SignInSuccessToast from '@/sections/signin/_components/signin-success-toast'

interface ErrorResponse {
  message: string
}

const SignInErrorToast = ({ message }: { message: string }) => (
  <div className="text-xl font-semibold text-red-600">{message}</div>
)

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

        toast.success(
          <SignInSuccessToast navigateToLogin={() => router.push('/')} />
        )

        await queryClient.invalidateQueries({ queryKey: [QUERY_KEY.AUTH] })
      } else {
        toast.error('Đăng nhập thất bại, vui lòng thử lại')
      }
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(
        <SignInErrorToast message={error?.response?.data?.message || ''} />
      )
    },
  })
}
