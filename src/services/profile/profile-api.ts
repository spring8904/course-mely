import {
  ProfileBioFormValues,
  UpdateProfilePayload,
} from '@/validations/profile'
import api from '@/configs/api'

const prefix = '/user/profile'

export const profileApi = {
  getProfile: async () => {
    return await api.get(`${prefix}`)
  },

  updateProfile: async (data: UpdateProfilePayload) => {
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

  updateBioProfile: async (data: ProfileBioFormValues) => {
    const formData = new FormData()

    Object.entries(data).forEach(([key, value]) => {
      if (value) {
        formData.append(`bio[${key}]`, value)
      }
    })

    formData.append('_method', 'PUT')

    return await api.post(prefix, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },
}
