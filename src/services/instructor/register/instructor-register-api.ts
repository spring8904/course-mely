import api from '@/configs/api'

const prefix = '/instructor/register'

export const instructorRegisterApi = {
  register: (data: FormData) => {
    return api.post(prefix, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },
}
