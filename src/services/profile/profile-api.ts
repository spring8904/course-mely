import {
  ProfileBioFormValues,
  UpdateProfilePayload,
} from '@/validations/profile'
import api from '@/configs/api'

const prefix = '/users/profile'

export const profileApi = {
  getProfile: async () => {
    return await api.get(`${prefix}`)
  },

  updateProfile: async (data: UpdateProfilePayload) => {
    const formData = new FormData()
    Object.entries(data).forEach(([key, value]) => {
      if (key === 'avatar' && value instanceof File) {
        formData.append('avatar', value)
      } else if (typeof value === 'string' || typeof value === 'number') {
        formData.append(key, value.toString())
      }
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
