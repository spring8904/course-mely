import api from '@/configs/api'

export const searchApi = {
  getDataBySearchQuery: async (query: string): Promise<any> => {
    const response = await api.get(`search?q=${query}`)

    return response.data
  },
}
