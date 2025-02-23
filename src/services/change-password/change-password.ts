import { ChangePasswordPayload } from '@/validations/change-password'
import api from '@/configs/api'

const prefix = '/user/change-password'

export const changePasswordApi = {
  changePassword: async (data: ChangePasswordPayload) => {
    const formData = new FormData()

    Object.keys(data).forEach((key) => {
      formData.append(key, (data as Record<string, string>)[key])
    })

    formData.append('_method', 'PUT')

    return await api.post(prefix, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },
}
