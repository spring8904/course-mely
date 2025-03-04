import { Revenue } from '@/types/Statistic'
import api from '@/configs/api'

const prefix = '/instructor/statistics'

export const instructorStatisticApi = {
  getRevenue: async (): Promise<Revenue> => {
    const res = await api.get(`${prefix}/revenue`)
    return res.data
  },
}
