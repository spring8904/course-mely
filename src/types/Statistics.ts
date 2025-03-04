export interface OverviewStatistics {
  totalCourse: number
  totalEnrollments: number
  totalRevenue: string
  averageRating: string
}

export interface RevenueStatistics {
  [key: string]: null | string
}
