import api from '@/configs/api'
import { IAuthData } from '@/types'

export const authApi = {
  signUp: async (formData: IAuthData) => {
    return await api.post('auth/sign-up', formData)
  },
}
