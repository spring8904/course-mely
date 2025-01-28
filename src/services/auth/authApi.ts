import { IAuthData } from '@/types'
import api from '@/configs/api'

export const authApi = {
  signUp: async (formData: IAuthData) => {
    return await api.post('auth/sign-up', formData)
  },
}
