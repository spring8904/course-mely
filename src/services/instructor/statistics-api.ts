import api from '@/configs/api'
import {
  OverviewStatistics,
  RevenueStatistics,
  StudentPurchaseStatistics,
} from '@/types/Statistics'

const prefix = '/instructor/statistics'

export const instructorStatisticApi = {
  getOverviewStatistics: async (): Promise<OverviewStatistics> => {
    const res = await api.get(`${prefix}/get-course-overview`)
    return res.data
  },

  getMonthlyRevenueStatistics: async (
    year: number
  ): Promise<RevenueStatistics> => {
    const res = await api.get(`${prefix}/get-month-revenue`, {
      params: {
        year,
      },
    })
    return res.data
  },

  getStudentPurchaseStatistics: async (
    year: number
  ): Promise<StudentPurchaseStatistics> => {
    const res = await api.get(`${prefix}/get-monthly-course-statistics`, {
      params: {
        year,
      },
    })
    return res.data
  },
}
