export interface OverviewStatistics {
  totalCourse: number
  totalEnrollments: number
  totalRevenue: string
  averageRating: string
}

export interface RevenueStatistics {
  [key: string]: null | string
}
export interface StudentPurchaseStatistics {
  [key: string]: {
    total_purchases: number
    total_students: number
  }
}
