import api from '@/configs/api'

export const bannersApi = {
  getBanners: async () => {
    return await api.get(`/banners`)
  },
}
