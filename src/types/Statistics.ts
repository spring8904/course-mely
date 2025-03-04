export interface OverviewStatistics {
  totalCourse: number
  totalEnrollments: number
  totalRevenue: string
  averageRating: string
}

export interface RevenueStatistics {
  fullMonthlyRevenue: { [key: string]: null | string }
  courseRevenue: CourseRevenue[]
  newPurchases: number
}

export interface CourseRevenue {
  id: number
  name: string
  slug: string
  total_revenue: string
}
