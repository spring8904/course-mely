import { IAuthData } from '@/types'
import api from '@/configs/api'

export const authApi = {
  signUp: async (formData: IAuthData) => {
    return await api.post('auth/sign-up', formData)
  },
  signIn: async (formData: IAuthData) => {
    return await api.post('auth/sign-in', formData)
  },
  logout: async () => {
    return await api.post('auth/logout')
  },
  googleRedirect: async () => {
    return await api.get('auth/google')
  },
  googleCallback: async (query: string) => {
    return await api.get(`auth/google/callback?${query}`)
  },
}
