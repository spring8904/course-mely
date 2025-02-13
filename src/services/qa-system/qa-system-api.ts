import api from '@/configs/api'

const prefix = '/qa-systems'

export const qaSystemApi = {
  getQaSystems: async () => {
    return await api.get(prefix)
  },
}
