import api from '@/configs/api'
import { OverviewStatistics, RevenueStatistics } from '@/types/Statistics'

const prefix = '/instructor/statistics'

export const instructorStatisticApi = {
  getOverviewStatistics: async (): Promise<OverviewStatistics> => {
    const res = await api.get(`${prefix}/get-course-overview`)
    return res.data
  },

  getRevenueStatistics: async (year: number): Promise<RevenueStatistics> => {
    const res = await api.get(`${prefix}/get-course-revenue`, {
      params: {
        start_date: `${year}-01-01`,
        end_date: `${year}-12-31`,
      },
    })
    return res.data
  },
}
